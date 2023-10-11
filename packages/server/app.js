import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { API_URL, PORT } from "./config/app.js";
import path from "path";

import router from "./routes/index.js";
import { DB_URL } from "./config/db.js";
import fileUpload from "express-fileupload";

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

app.use(
  cors({
    credentials: true,
    origin: ["http://18.116.170.169/", "http://localhost:5173"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(API_URL, router);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));

  app.use(
    "/public/images",
    express.static(path.join(__dirname, "public/images"))
  );
  // app.use(express.static(path.join(__dirname, "public")));
  app.all("*", (req, res, next) => {
    res.sendFile(path.resolve(__dirname, "../client/dist/index.html"));
  });
}

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
