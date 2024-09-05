import mongoose, { Schema } from "mongoose";

const TicketSchema = new mongoose.Schema({
  showId: {
    type: Schema.Types.ObjectId,
    ref: "Show",
  },
  price: {
    type: Number,
    required: true
  },
  availableTickets: {
    type: Number,
    required: true,
    min: 0
  }
}, { timestamps: true });

const Ticket = mongoose.model('Ticket', TicketSchema);

export default Ticket;
