import mongoose from 'mongoose'
import dotenv from "dotenv";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI

if(!MONGO_URI){
    throw new Error('MONGO_URI is not defined')
}
async function dbConnect(){
    if(mongoose.connection.readyState !==1){
        try{
            await mongoose.connect(MONGO_URI)
            console.log("DB connected")
        } catch(error){
            console.log('error', error)
            throw error
        }
    } else{
        console.log("MongoDB is already connected")
    }
}

export default dbConnect;