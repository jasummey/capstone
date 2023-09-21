import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { API_URL, PORT } from "./config/app.js";

import router from "./routes/index.js";
import { DB_URL } from "./config/db.js";

mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(API_URL, router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
