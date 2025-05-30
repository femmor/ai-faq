import mongoose from "mongoose";
import { logInfo, logError } from "../utils/logger.js";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI as string);
        logInfo(`MongoDB Connected Successfully`);
    } catch (error) {
        logError(error instanceof Error ? error : new Error("Failed to connect to MongoDB"));
        process.exit(1);
    }
};

export default connectDB;