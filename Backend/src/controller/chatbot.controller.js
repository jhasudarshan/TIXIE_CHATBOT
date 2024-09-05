import { exec } from 'child_process';
import path from 'path';
import Razorpay from 'razorpay';
import { __dirname } from '../../app.js';
import Ticket from '../model/ticket.model.js';
import Show from '../model/show.model.js';
import Booking from '../model/booking.model.js';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import User from '../model/user.model.js';

dotenv.config();



// Create a transporter object using SMTP transport
let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465, // Use 587 for TLS
    secure: true, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_ADD, // Replace with your Gmail address
        pass: process.env.EMAIL_PASS     // Replace with the app password you generated
    }
});

// Store user sessions
let userSessions = {};

// Razorpay setup
const razorpay = new Razorpay({
  key_id: 'YOUR_RAZORPAY_KEY_ID',
  key_secret: 'YOUR_RAZORPAY_KEY_SECRET',
});

const getIntentFromMessage = async (message) => {
  const pythonScriptPath = path.join(__dirname, 'ChatBot', 'nlp_model.py');
  return new Promise((resolve, reject) => {
    exec(`python "${pythonScriptPath}" "${message}"`, (error, stdout, stderr) => {
      if (error) {
        return reject(error);
      }
      try {
        const result = JSON.parse(stdout.trim());
        resolve(result);
      } catch (e) {
        reject(e);
      }
    });
  });
}

const getShowNameFromMessage = async (message) => {
  const pythonScriptPath = path.join(__dirname, 'ChatBot', 'nlp_show.py');
  return new Promise((resolve, reject) => {
    exec(`python "${pythonScriptPath}" "${message}"`, (error, stdout, stderr) => {
      if (error) {
        return reject(error);
      }
      try {
        const result = JSON.parse(stdout.trim()); // Assuming stdout contains the show name
        resolve(result);
      } catch (e) {
        reject(e);
      }
    });
  });
}

const getNumberOfTicket = async (message) => {
  const pythonScriptPath = path.join(__dirname, 'ChatBot', 'model_no.py');
  return new Promise((resolve, reject) => {
    exec(`python "${pythonScriptPath}" "${message}"`, (error, stdout, stderr) => {
      if (error) {
        return reject(error);
      }
      try {
        const result = JSON.parse(stdout.trim()); // Assuming stdout contains the show name
        resolve(result);
      } catch (e) {
        reject(e);
      }
    });
  });
}

// Helper function to initiate payment process
const initiatePaymentProcess = async (userId, noOfTickets, showName) => {
    try {
      const order = await razorpay.orders.create({
        amount: noOfTickets * 100 * 1, // Amount in paise (assume 100 paise = 1 INR)
        currency: 'INR',
        receipt: `order_${userId}`,
        payment_capture: '1'
      });
  
      console.log(`Payment order created: ${order.id}`);
      return true;
    } catch (error) {
      console.error('Payment initiation failed:', error);
      return false;
    }
}

//helper function to save booking details
const saveBookingToDatabase = async (userId, showId, noOfTickets) => {
    try { 
        //Save Booking Details
        // Step 1: Fetch the relevant ticket associated with the show
        const ticket = await Ticket.findOne({ showId });
    
        if (!ticket) {
            return res.status(404).json({ message: "Ticket not found for the given show." });
        }
        
        // Step 3: Create a new booking
        const newBooking = new Booking({
            noOfTickets,
            ticket: ticket._id,
            userId,
        });

        // Step 4: Save the booking to the database
        const savedBooking = await newBooking.save();
        
        // Step 5: Update the available tickets in the Ticket model
        ticket.availableTickets -= noOfTickets;
        await ticket.save();
        console.log(`Booking saved for user ${userId}: ${noOfTickets} tickets for show ${showId}`);
        //return savedBooking;
    } catch (error) {
      console.error('Failed to save booking to database:', error);
    }
}


const sendConfirmationEmail = async (userId, noOfTickets, showId) => {

    const user = await User.findById(userId);
    const userEmail = user.email;
    console.log(userEmail); 
    const mailOptions = {
      from: process.env.EMAIL_ADD, // Replace with your verified sender email
      to: userEmail, // Replace with user's email
      subject: 'Booking Confirmation',
      text: `Dear User,\n\nYou have successfully booked ${noOfTickets} tickets for the ${showId} exhibition.\n\nThank you for booking with us!`,
    };
  
    try {
      await transporter.sendMail(mailOptions);
      console.log(`Confirmation email sent to user ${userId}`);
    } catch (error) {
      console.error('Failed to send confirmation email:', error);
    }
  };

const handleChat = async (req, res) => {
  const { message, userId } = req.body;
  console.log(message);
  // Initialize user session if it doesn't exist
  if (!userSessions[userId]) {
    userSessions[userId] = {
      prevIntent: null,
      showId: null,
      noOfTickets: null
    };
  }

  const result = await getIntentFromMessage(message);
  const intent = result.intent;
  const response = result.response;

  // Handle 'ticket_booking' intent
  if (intent === 'ticket_booking') {
    userSessions[userId].prevIntent = intent;

    const result1 = await getShowNameFromMessage(message);
    const showName = result1.m_name.trim();

    // Find the show in the database using the extracted showName
    const show = await Show.findOne({ title: showName }); // Assuming the field is 'name' in Show schema

    if (!show) {
        return res.status(400).json({
            response: "This show is not available. Please enter a valid show name."
        });
    }

    userSessions[userId].showId = show._id;

    const result2 = await getNumberOfTicket(message);
    if(!result2){
        return res.status(200).json({
            response: `You've chosen the show: ${show.title}. How many tickets would you like to book?`
          });
    }
    const noOfTickets = result2.ticket_no;

    const ticket = await Ticket.findOne({ showId: userSessions[userId].showId });

    if (noOfTickets > ticket.availableTickets) {
      return res.status(400).json({
        response: `We only have ${availableTickets} tickets available. Please book fewer tickets.`
      });
    }

    userSessions[userId].noOfTickets = noOfTickets;

    // Initiate payment process
    //const paymentSuccessful = await initiatePaymentProcess(userId, noOfTickets, userSessions[userId].museumName);

    // if (!paymentSuccessful) {
    //   return res.status(500).json({
    //     response: "Payment failed. Please refresh the chatbot to initiate the payment again."
    //   });
    // }

    // Save booking details to the database
    await saveBookingToDatabase(userId, userSessions[userId].showId, noOfTickets);

    const showId = userSessions[userId].showId;
    // Send confirmation email to the user
    await sendConfirmationEmail(userId, noOfTickets, showId);

    return res.status(200).json({
      response: `You've successfully booked ${noOfTickets} tickets for the ${showName} exhibition. A confirmation email has been sent to you.`
    });

  } else if (userSessions[userId].prevIntent === 'ticket_booking') {
    let showName,show;
    if (!userSessions[userId].showId) {
        showName = await getShowNameFromMessage(message);
        show = await Show.findOne({showName});

        if (!show) {
            return res.status(400).json({
              response: "This show is not available. Please enter a valid show name."
            });
        }

        userSessions[userId].showId = show._id;

    }


    const result = await getNumberOfTicket(message);
    if(!result){
      return res.status(200).json({
        response: `You've chosen the show: ${show.title}. How many tickets would you like to book?`
      });
    }
    const noOfTickets = result.ticket_no;
    const ticket = await Ticket.findOne({ showId: userSessions[userId].showId });

    if (noOfTickets > ticket.availableTickets) {
      return res.status(400).json({
        response: `We only have ${availableTickets} tickets available. Please book fewer tickets.`
      });
    }

    userSessions[userId].noOfTickets = noOfTickets;

    // Initiate payment process
    //const paymentSuccessful = await initiatePaymentProcess(userId, noOfTickets, userSessions[userId].museumName);

    // if (!paymentSuccessful) {
    //   return res.status(500).json({
    //     response: "Payment failed. Please refresh the chatbot to initiate the payment again."
    //   });
    // }

    // Save booking details to the database
    await saveBookingToDatabase(userId, userSessions[userId].showId, noOfTickets);

    const showId = userSessions[userId].showId;
    // Send confirmation email to the user
    await sendConfirmationEmail(userId, noOfTickets, showId);

    return res.status(200).json({
      response: `You've successfully booked ${noOfTickets} tickets for the ${userSessions[userId].museumName} exhibition. A confirmation email has been sent to you.`
    });

  } else {
    return res.status(200).json({
      response
    });
  }
}

export default handleChat;