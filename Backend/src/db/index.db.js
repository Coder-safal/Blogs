
import mongoose from "mongoose"
import { DB_NAME } from "../constants.js"


const connectDB = async () => {

    try {
        await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
    } catch (error) {
        throw error;
    }
}

export { connectDB };