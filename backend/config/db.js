import mongoose from "mongoose";

export const connectDB = async () =>{
    await mongoose.connect("mongodb+srv://kauser1987:kauser1987@cluster0.bqsns73.mongodb.net/food-del").then(()=>console.log("db connected"))
}



