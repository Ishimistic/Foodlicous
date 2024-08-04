import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import UserRoutes from "./routes/UserRouting.js";
import FoodRoutes from "./routes/FoodRouting.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

//Routes
app.use("/api/user/", UserRoutes);
app.use("/api/food/", FoodRoutes);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

app.get("/", async (req, res) => {
  res.status(200).json({
    message: "In server",
  });
});

const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_DB)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => {
      console.log("Failed to connect to MongoDB");
      console.log(err);
    });
};

const startServer = async () => {
  try {
    connectDB();
    app.listen(8080, () => console.log("Server started on 8080"));
  } catch (error) {
    console.log(error);
  }
};

startServer();
