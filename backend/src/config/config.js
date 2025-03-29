import dotenv from "dotenv";
import { connect } from "mongoose";
import { program } from 'commander';

dotenv.config();

export default {
  PORT: process.env.PORT || 3000,
  secret: process.env.JWT_SECRET 
};

export const connectionMongo = async () => {
  try {
    await connect(process.env.MONGO_URL);
  } catch (error) {
    throw new Error("Error al conectar con la base de datos");
  }
};

program
    .option('--logger <logger>', '', 'DEVELEPOMENT')

program.parse();

export const option = program.opts();
