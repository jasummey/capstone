import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { API_URL } from "./config/app";
import { PORT } from "./config/app";
import { DB_URL } from "./config/db";
import router from "./routes/index";

mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB:", error);
  });

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(API_URL, router);

app.listen(PORT, () =>
  console.log(`[Server] Listening for requests at https://localhost:${PORT}`)
);

export default app;
