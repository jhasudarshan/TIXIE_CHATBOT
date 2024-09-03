const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
  type: String,
  price: Number,
  available: Boolean
});

const Ticket = mongoose.model('Ticket', TicketSchema);

export default Ticket;