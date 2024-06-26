import express from "express";
import roomRouter from "./Routers/BookingRouters.js"

const app = express()

const PORT =6000

app.use(express.json());

app.use("/roomapi",roomRouter)

app.listen(PORT,()=>{
    console.log(`PORT is running ${PORT}`);
})