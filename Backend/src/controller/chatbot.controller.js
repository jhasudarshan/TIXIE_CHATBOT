// chatbot.js
import { exec } from 'child_process';
import path from 'path';
import {__dirname } from '../../app.js'

const getIntentFromMessage = async(message) => {
  const pythonScriptPath = path.join(__dirname, 'ChatBot', 'nlp_model.py');
  return new Promise((resolve, reject) => {
    exec(`python "${pythonScriptPath}" "${message}"`, (error, stdout, stderr) => {
      if (error) {
        return reject(error);
      }
      try {
        const result = JSON.parse(stdout.trim());
        resolve(result);
        // resolve(stdout);
      } catch (e) {
        reject(e);
      }
    });
  });
}

const handleChat =  async(req, res)  => {
  const {message} = req.body;
  const result = await getIntentFromMessage(message);
  const intent = result.intent;
  const response = result.response;
  console.log(result);
  console.log(intent);
  console.log(response);
  // {tag, resp}

  /*if(tag =='Book a ticket'){
    const {museumName} = nlp_show();
    if(muse)
  }


  */
  // if (intent === 'book_ticket') {
  //   // Logic to book a ticket
  //   const ticket = await Ticket.findOne({ available: true });
  //   if (ticket) {
  //     const booking = new Booking({ user: userId, ticket: ticket._id });
  //     await booking.save();

  //     ticket.available = false;
  //     await ticket.save();

  //     return `Ticket booked successfully! Ticket ID: ${booking._id}`;
  //   } else {
  //     return 'No tickets available right now.';
  //   }
  // } else if (intent === 'available_tickets') {
  //   // Logic to check available tickets
  //   const tickets = await Ticket.find({ available: true });
  //   if (tickets.length > 0) {
  //     return `Available tickets: ${tickets.map(t => t.type).join(', ')}`;
  //   } else {
  //     return 'No tickets available right now.';
  //   }
  // } else {
  //   return 'Sorry, I did not understand that. Can you please rephrase?';
  // }
  res.status(200).json({
    response
  })
}

export default handleChat;