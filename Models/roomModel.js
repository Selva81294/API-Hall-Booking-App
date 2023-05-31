import mongoose from "mongoose";


const roomModel = new mongoose.Schema({
  roomNo: { type: Number},
  bookings: 
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking"
  },
  noSeats: { type: Number },
  amenities: { type: String },
  price: { type: Number },
});

const Room = mongoose.model("Room", roomModel);

export default Room;
