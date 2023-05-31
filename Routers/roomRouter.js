import express from "express";
import Room from "../Models/roomModel.js";


const router = express.Router();


router.get("/", async(req,res)=>{
    res.json({
        output: "Hall Booking API",
      });
})

//get all room details
router.get("/getAllRooms", async(req,res)=>{
    try {
        const room = await Room.aggregate([{$lookup:{from: "bookings", localField:"roomNo", foreignField:"roomNo", as:"bookings"}}])
        if(!room) return res.status(400).json({message:"Could not fetch your data"}) 
        res.status(200).json(room)
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Internal Server Error"})
    }
})

//Creating a room
router.post("/createRoom", async(req,res)=>{
    try {
      let room = {};
      room.roomNo = req.body.roomNo;
      if (req.body.noSeats) {
        room.noSeats = req.body.noSeats;
      } else {
        res.status(400).json({ output: "Please specify No of seats for Room" });
      }
      if (req.body.amenities) {
        room.amenities = req.body.amenities;
      } else {
        res
          .status(400)
          .json({
            output: "Please specify all Amenities for Room in Array format",
          });
      }
      if (req.body.price) {
        room.price = req.body.price;
      } else {
        res.status(400).json({ output: "Please specify price per hour for Room" });
      }
      await Room.create(room)
      res.status(200).json({ output: "Room Created Successfully" });
    } catch (error) {
      console.log(error)
      res.status(500).json({message: "Internal Server Error"})
    }
})

export const roomRouter = router