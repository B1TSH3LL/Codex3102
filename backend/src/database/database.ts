import mongoose from "mongoose";
import { config } from "../config/app.config";

const connectDatabase = async () => {
  try {
    await mongoose.connect(config.MONGO_URI);
    console.log("Connected to Mongoose database successfully");
  } catch (error) {
    console.error("error connecting to Mongoose database: " + error);
    process.exit(1);
  }
};

export default connectDatabase;
