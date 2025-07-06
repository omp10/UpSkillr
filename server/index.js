import express from "express";
import dotev from "dotenv";
import connectDB from "./database/db.js";

dotev.config({});
connectDB();
const app=express();
const PORT=process.env.PORT||3000;
app.listen(PORT,()=>{
    console.log(`Server started at ${PORT}`)
})

app.use('/',(req,res)=>{
    res.send("Hello")
})