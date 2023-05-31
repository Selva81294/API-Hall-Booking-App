import express from "express";
import Booking from "../Models/bookingsModel.js";
import Room from "../Models/roomModel.js";

const router = express.Router();

let date_regex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
// let time_regex = /^(0[1-9]|1\d|2[0-3])\:(0[1-9]|1\d|2\d|3\d|4\d|5\d)/;
let time_regex = /^(0[0-9]|1\d|2[0-3])\:(00)/;

//get all booking details
router.get("/getAllBookings", async (req, res) => {
  try {
    const booking = await Booking.find();
    if (!booking)
      return res.status(400).json({ message: "Could not fetch your data" });
    res.status(200).json(booking);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//Creating a bookings

router.post("/createBooking", async (req, res) => {
  try {
    let booking = {};
    if (req.body.custName) {
      booking.custName = req.body.custName;
    } else {
      res
        .status(400)
        .json({ output: "Please specify customer Name for booking." });
    }
    if (req.body.roomNo) {
      booking.roomNo = req.body.roomNo;
    } else {
      res
        .status(400)
        .json({ output: "Please specify Room Number for booking." });
    }
    if (req.body.date) {
      if (date_regex.test(req.body.date)) {
        booking.date = req.body.date;
      } else {
        res.status(400).json({ output: "Please specify date in MM/DD/YYYY" });
      }
    } else {
      res.status(400).json({ output: "Please specify date for booking." });
    }

    if (req.body.startTime) {
      if (time_regex.test(req.body.startTime)) {
        booking.startTime = req.body.startTime;
      } else {
        res.status(400).json({
          output:
            "Please specify time in hh:min(24-hr format) where minutes should be 00 only",
        });
      }
    } else {
      res
        .status(400)
        .json({ output: "Please specify Starting time for booking." });
    }

    if (req.body.endTime) {
      if (time_regex.test(req.body.endTime)) {
        booking.endTime = req.body.endTime;
      } else {
        res.status(400).json({
          output:
            "Please specify time in hh:min(24-hr format) where minutes should be 00 only",
        });
      }
    } else {
      res
        .status(400)
        .json({ output: "Please specify Ending time for booking." });
    }

    await Booking.create(booking);
    res.status(200).json({ output: "Room Booking Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export const bookingRouter = router;
