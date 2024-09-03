import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  ticket: { type: mongoose.Schema.Types.ObjectId, ref: 'Ticket' },
  bookingDate: { type: Date, default: Date.now }
});

const Booking = mongoose.model('Booking', BookingSchema);
export default Booking