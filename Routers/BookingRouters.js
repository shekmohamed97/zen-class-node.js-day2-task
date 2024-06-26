import express, { Router } from "express";
import {  getAllRoom, getBookingCustomer, getBookingRooms, getCustomerBookingTime, roomBooking, roomCreate } from "../controllers/Booking.js";

const router= express.Router();

router.post("/roomcreate", roomCreate)
router.get("/getrooms",getAllRoom);
router.post("/bookingroom",roomBooking);
router.get("/getbooking",getBookingRooms)
router.get("/getcustomers",getBookingCustomer)
router.get("/getbookingtime",getCustomerBookingTime)
export default router