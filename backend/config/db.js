import mongoose from "mongoose";

export const connectDB = async () =>{
   const connection =  await mongoose.connect(process.env.MONGO_URL)
    if(connection.STATES.connected) console.log("database connected")
        if(connection.STATES.disconnected)
            {
                console.log("database disconnected")
                return;
            }    

}



// const connection = await mongoose.connect(process.env.MONGO_URI)
// if(connection.STATES.connected) console.log("database connected")
// if(connection.STATES.disconnected)
//     {
//         console.log("database disconnected")
//         return;
//     }