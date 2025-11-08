import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import Routes from "@Routes/index";
import { errorHandler } from "@Middlewares/ErrorHandlers";
import cookieParser from "cookie-parser";

const app = express();
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use("/api", Routes);
app.use(errorHandler);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
