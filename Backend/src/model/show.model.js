import mongoose, { Schema } from "mongoose";

const showSchema = new mongoose.Schema({
  // museumId: {
  //   type: Schema.Types.ObjectId,
  //   ref: "Museum",
  //   required: true
  // },
  showId: {
    type: String,
    require: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  }
}, { timestamps: true });

const Show = mongoose.model('Show', showSchema);

export default Show;