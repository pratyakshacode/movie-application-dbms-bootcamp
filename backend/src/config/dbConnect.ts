import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from 'dotenv';
import mongoose from "mongoose";

dotenv.config();
console.log("dirname", __dirname)
export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: process.env.SQL_USERNAME,
  password: process.env.SQL_PASSWORD,
  database: "ticketbooking",
  synchronize: true,
  logging: true,
  entities: [__dirname + "/../entities/**/*.js"], // only JS since nodemon runs dist
});

export const connectDB = async () => {
  try {
    await Promise.all([
      AppDataSource.initialize().then(() => {
        console.log("✅SQL (TypeORM) connected");
      }),
      mongoose.connect(process.env.MONGODB_URL as string).then(() => {
        console.log("✅ MongoDB connected");
      }),
    ]);
  } catch (error) {
    console.error("❌ ERROR IN CONNECTING DATABASES:", error);
    process.exit(1); // stop server if DB fails
  }
};