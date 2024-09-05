import mongoose,{Schema} from "mongoose";

const BookingSchema = new Schema({
  numberOfTicket : {
    type: Number,
    require:true
  },
  ticket: { 
    type: Schema.Types.ObjectId,
    ref: 'Ticket' 
  },
  bookingDate: { 
    type: Date, 
    default: Date.now 
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

const Booking = mongoose.model('Booking', BookingSchema);
export default Booking