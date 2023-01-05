import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes.js";

import "dotenv/config";
const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;

const main = async () => {
  try {
    const app = express();

    app.use(cors());
    app.use(express.json());
    app.use("/api/auth", userRoutes);

    const mongodb = await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const db = mongodb.connection;
    console.log(`MongoDB connected: ${db.host}:${db.port}`);

    app.use(express.static("public"));

    const server = app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

main();
