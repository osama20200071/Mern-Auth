import mongoose from "mongoose";

const dbConnection = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI);
    console.log("connection established to the db", connect.connection.name);
  } catch (error) {
    console.log("failed to connect to the db", error);
    // process.exit(1);
  }
};

export { dbConnection };
