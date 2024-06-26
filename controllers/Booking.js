import {format} from "date-fns"

let rooms=[
    {
        room_id:1,
        room_name:"room-1",
        room_status:"available",
        amenities:"tv,washing machine, iron box",
        seats:4,
        price_per_hrs:1000
       },
       {
        room_id:2,
        room_name:"room-2",
        room_status:"available",
        amenities:"tv,washing machine, iron box",
        seats:6,
        price_per_hrs:2000
       },
       {
        room_id:3,
        room_name:"room-3",
        room_status:"available",
        amenities:"tv,washing machine, iron box",
        seats:10,
        price_per_hrs:4000
       }
]

export let bookings = [];

export const roomCreate=(req,res)=>{
    const {room_name,room_status,seats,amenities,price_per_hrs}=req.body;
    const newRoom={
        room_name,
        room_status,
        seats,
        amenities,
        price_per_hrs
    };
    rooms.push(newRoom);
    res.status(201).json({message:"Room Create Successfully !",room:newRoom});
}



export const getAllRoom= async(req,res)=>{
    try {
        await res.status(200).json({
            comment:"fetch all room succesfully !",
            rooms
        })
    } catch (error) {
        res.status(500).json({
            comment:"Internel server error"
        })
    }
};

export const roomBooking=(req,res)=>{
    const{customerName,date,startTime,endTime,room_id}=req.body;
    const newBooking={
        id:bookings.length+1,
        customerName,
        date,
        startTime,
        endTime,
        room_id,
        bookingDate:new Date().toISOString().split("T")[0],
        status:'booked'
    }
    bookings.push(newBooking);
    res.status(201).json({message:"Room Booking Successfully !",booking:newBooking});
}

export const getBookingRooms=(req,res)=>{
    const result=rooms.map(room=>{
        const roomBookings=bookings.filter(booking=>booking.room_id===room.id)
        return{
            ...room,
            bookings:roomBookings.map(booking=>({
                customerName:booking.customerName,
                date:booking.date,
                startTime:booking.startTime,
                endTime:booking.endTime,
                status:booking.status
            }))
        }
    })
    res.json(result);
}


export const getBookingCustomer=(req,res)=>{
   const result=bookings.reduce((acc,booking)=>{
    if(!acc[booking.customerName]){
        acc[booking.customerName]=[];
    }
    acc[booking.customerName].push({
        roomName:booking.room_id,
        date:booking.date,
        startTime:booking.startTime,
        endTime:booking.endTime
    });
    return acc;
   },{});
   res.json(result);
}

export const getCustomerBookingTime=(req,res)=>{
    const customerName=req.query.customerName;
    const customerBookings=bookings.filter(booking=>booking.customerName===customerName);
    const result=customerBookings.map(booking=>({
        roomName:booking.room_id,
        date:booking.date,
        startTime:booking.startTime,
        endTime:booking.endTime,
        bookingId:booking.id,
        bookingDate:booking.bookingDate,
        status:booking.status
    }));
    res.json(result);
};

