import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/foodRoutes.js"
import userRouter from "./routes/userRoutes.js"
// import dotenv from "dotenv";
import 'dotenv/config'
import cartRouter from "./routes/cartRoutes.js"
import orderRouter from "./routes/orderRoutes.js"



//app config
const app = express()
const port = 4000

// dotenv.config();
// middleware
app.use(express.json())


// db connection
connectDB();

// app.use(cors())
// app.use(cors());
app.use(cors(
    {
        origin: ["https://foodie-foodie-wheat.vercel.app","https://foodie-foodie-edhh.vercel.app/list"],
        credentials:true,
    }
))



// api endpoints
app.use("/api/user", userRouter)
app.use("/api/food", foodRouter)
app.use("/images",express.static('uploads'))
app.use("/api/cart", cartRouter)
app.use("/api/order", orderRouter)


app.get("/", (req,res)=>{
    res.send("Api Working")
})

app.listen(port, ()=>{
    console.log(`server started on http://localhost:${port}`)
})