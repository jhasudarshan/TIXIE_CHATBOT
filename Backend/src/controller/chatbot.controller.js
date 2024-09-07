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
        console.log(stdout);
        if(stdout.trim() !== ''){
          const result = JSON.parse(stdout.trim());
          resolve(result);
        }
        resolve(stdout);
         // Assuming stdout contains the show name
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

        const show = await Show.findById(showId);
    
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
        console.log(`Booking saved for user ${userId}: ${noOfTickets} tickets for show ${show.title}`);
        //return savedBooking;
    } catch (error) {
      console.error('Failed to save booking to database:', error);
    }
}


const sendConfirmationEmail = async (userId, noOfTickets, showId) => {

    const user = await User.findById(userId);
    const show = await Show.findById(showId);
    const userEmail = user.email;
    console.log(userEmail); 
    const mailOptions = {
      from: process.env.EMAIL_ADD, // Replace with your verified sender email
      to: userEmail, // Replace with user's email
      subject: 'Booking Confirmation',
      text: `Dear User,\n\nYou have successfully booked ${noOfTickets} tickets for the ${show.title} exhibition.\n\nThank you for booking with us!`,
    };
  
    try {
      await transporter.sendMail(mailOptions);
      console.log(`Confirmation email sent to user ${userId}`);
    } catch (error) {
      console.error('Failed to send confirmation email:', error);
    }
}

const handleChat = async (req, res) => {
  const { message, userId } = req.body;
  // Initialize user session if it doesn't exist
  
  if (!userSessions[userId]) {
    userSessions[userId] = {
      prevIntent: null,
      showId: null,
      noOfTickets: 0
    };
  }

  const result = await getIntentFromMessage(message);
  const intent = result.intent;
  const response = result.response;

  console.log("Response: ",response);
  console.log("userSession -> pevIntent: ",userSessions[userId].prevIntent);
  console.log("userSession -> showId: ",userSessions[userId].showId);
  console.log("userSession -> noOfTicket: ",userSessions[userId].noOfTickets);


  // Handle 'ticket_booking' intent
  if ( intent === 'ticket_booking' || userSessions[userId].prevIntent === 'ticket_booking') {
    if(intent === 'ticket_booking'){
      userSessions[userId].prevIntent = intent;
    }

    const result1 = await getShowNameFromMessage(message);
    const showName = result1.m_name.trim();
    const result2 = await getNumberOfTicket(message);
    let show,noOfTickets;

    if(showName !== '' || userSessions[userId].showId !== null){

      show = await Show.findOne({ title: showName });

      if (!show && !userSessions[userId].showId) 
      {
        userSessions[userId].noOfTickets = result2.ticket_no;
    
        //go for show name
        return res.status(200).json({
          response: "Please enter a valid show name"
        });

      }else{
        if(show){
          userSessions[userId].showId = show._id;
        }else{
          show = await Show.findById(userSessions[userId].showId);
        }

        console.log("result2: ",result2);
        console.log("result2.ticket_no",result2.ticket_no);
        console.log("userSessions[userId].noOfTickets",userSessions[userId].noOfTickets);

        if(!result2.ticket_no && !userSessions[userId].noOfTickets){
          //go for number of ticket to book
          return res.status(200).json({
              response: `You've chosen the show: ${show.title}. How many tickets would you like to book?`
          });
        }

        noOfTickets = result2.ticket_no || userSessions[userId].noOfTickets;
        const ticket = await Ticket.findOne({ showId: userSessions[userId].showId });

        //check ticket is available or not
        if (!ticket && (noOfTickets > ticket.availableTickets)) {
          return res.status(200).json({
            response: `We only have ${ticket.availableTickets} tickets available. Please book fewer tickets.`
          });
        }

        // Initiate payment process
        //const paymentSuccessful = await initiatePaymentProcess(userId, noOfTickets, userSessions[userId].museumName);

        // Save booking details to the database
        const showId = userSessions[userId].showId
        //save details to database
        await saveBookingToDatabase(userId, showId, noOfTickets);
    
        // Send confirmation email to the user
        await sendConfirmationEmail(userId, noOfTickets, showId);
        userSessions[userId] = {
          prevIntent: null,
          showId: null,
          noOfTickets: null
        };

        return res.status(200).json({
          response: `You've successfully booked ${noOfTickets} tickets for the ${show.title} exhibition. A confirmation email has been sent to you.`
        });

      }
    }else{
      userSessions[userId].noOfTickets = result2.ticket_no;

      //go for show name
      return res.status(200).json({
        response: "Please enter a show name"
      });
    }
  } else {
    return res.status(200).json({
      response
    });
  }
}

export default handleChat;