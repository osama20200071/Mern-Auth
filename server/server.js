import express from "express";
import path, { dirname } from "path";
import dotenv from "dotenv";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import usersRoutes from "./routes/userRoutes.js";
import {
  globalErrorMiddleware,
  notFoundMiddleware,
} from "./middlewares/errorMiddleware.js";
import { dbConnection } from "./config/db.js";
import { protect } from "./middlewares/authMiddlware.js";

dotenv.config({ path: ".env" });
const app = express();

// @desc: connect to the database
dbConnection();

// @desc: body parser middlewares to parse the json body
app.use(express.json());

// @desc: cookie parser middleware to parse the cookies
app.use(cookieParser());

// @desc: body parser middlewares to parse form data
app.use(express.urlencoded({ extended: true }));

// @desc: morgan middleware to log the request
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

app.use("/api/users", usersRoutes);

if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "../client/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client", "dist", "index.html"));
  });
} else {
  app.get("/", (req, res) => res.send("Server is Running"));
}

// @desc: middleware to handle 404 errors not found endpoints
app.all("*", notFoundMiddleware);

// @desc: middleware to handle global errors
app.use(globalErrorMiddleware);

// @desc: start the server
app.listen(process.env.PORT, (err) => {
  console.log("app listening on port " + process.env.PORT);
});
