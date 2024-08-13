import mongoose, { ConnectOptions } from "mongoose";

interface ConnectOptionsType extends ConnectOptions {
  useNewUrlParser: boolean;
  useUnifiedTopology: boolean;
}

let isConnected = false; // Track the connection status

export const connectToDB = async (): Promise<void> => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }

  try {
    const options: ConnectOptionsType = {
      dbName: "share_prompt",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    await mongoose.connect(process.env.MONGODB_URI!, options);
    isConnected = true;
    console.log("MongoDB connected");
  } catch (error) {
    console.error(error);
  }
};
