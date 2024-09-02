// chatbot.js
import { exec } from 'child_process';

async function getIntentFromMessage(message) {
  return new Promise((resolve, reject) => {
    exec(`python3 nlp_model.py "${message}"`, (error, stdout, stderr) => {
      if (error) {
        return reject(error);
      }
      try {
        const result = JSON.parse(stdout);
        resolve(result.intent);
      } catch (e) {
        reject(e);
      }
    });
  });
}

async function handleChat(message, userId) {
  const intent = await getIntentFromMessage(message);

  if (intent === 'book_ticket') {
    // Logic to book a ticket
    const ticket = await Ticket.findOne({ available: true });
    if (ticket) {
      const booking = new Booking({ user: userId, ticket: ticket._id });
      await booking.save();

      ticket.available = false;
      await ticket.save();

      return `Ticket booked successfully! Ticket ID: ${booking._id}`;
    } else {
      return 'No tickets available right now.';
    }
  } else if (intent === 'available_tickets') {
    // Logic to check available tickets
    const tickets = await Ticket.find({ available: true });
    if (tickets.length > 0) {
      return `Available tickets: ${tickets.map(t => t.type).join(', ')}`;
    } else {
      return 'No tickets available right now.';
    }
  } else {
    return 'Sorry, I did not understand that. Can you please rephrase?';
  }
}

module.exports = handleChat;
