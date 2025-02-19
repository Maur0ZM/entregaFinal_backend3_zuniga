import dotenv from "dotenv";
import { connect } from "mongoose";

dotenv.config();

export default {
  PORT: process.env.PORT || 3000,
};

export const connectionMongo = async () => {
  try {
    await connect(process.env.MONGO_URL);
  } catch (error) {
    throw new Error(error);
  }
};
