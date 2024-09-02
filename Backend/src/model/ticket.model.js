const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
  type: String,
  price: Number,
  available: Boolean
});

module.exports = mongoose.model('Ticket', TicketSchema);