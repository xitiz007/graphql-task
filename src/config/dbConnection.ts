import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const MONGODB_URI = process.env.MONGODB_URI as string;
    await mongoose.connect(MONGODB_URI);
  } catch (err: any) {
    console.log(err?.message);
  }
};

export default connectDB;
