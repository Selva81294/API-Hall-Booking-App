import mongoose from "mongoose";

const bookingModel = new mongoose.Schema({
  custName: { type: String },
  date: { type: String },
  startTime: { type: String },
  endTime: { type: String },
  roomNo: { type: Number},
});

const Booking = mongoose.model("Booking", bookingModel);

export default Booking;
