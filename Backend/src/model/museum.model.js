import mongoose,{ Schema, Types } from "mongoose";

const museumSchema = new Schema({
    m_name: {
        type: String,
        require: true,
        unique: true,
        trim: true
    },
    m_address: {
        type: String,
        require: true,
        trim: true
    },
    bookedTicketId: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Ticket'
    }],
    showId: [{
        type: Schema.Types.ObjectId,
        ref:'Show'
    }]
},{timestamps: true});

const Museum = mongoose.model('Museum',museumSchema);

export default Museum;