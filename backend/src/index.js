import dotenv from "dotenv";
dotenv.config();

import express from "express";
import httpStatus from "http-status";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import colors from "colors";
import { dbConnect } from "./config/db.js";


import UserRoute from "./routes/User.js";
import categoryRouter from "./routes/Category.js";
import ExpenseRouter from "./routes/Expense.js";

const app = express();
const { NODE_ENV, PORT } = process.env;

// app general use

app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(express.static("public")); //set folder for public access of files and images

if (NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// the first position is always the request while the second is the response
app.use("/users", UserRoute);
app.use("/category", categoryRouter);
app.use("/expenses", ExpenseRouter);

app.get("/", (req, res) => {
  res.status(httpStatus.OK).json({
    status: "success",
    message: "Welcome To Node Tracker server",
  });
});

// we use req.body for post

app.all("*", (req, res) => {
  res.status(httpStatus.OK).json({
    status: "error",
    message: "No Endpoint found",
  });
});

dbConnect()
  .then((res) => {
    console.log(`Database is connect`.bgCyan);
    const port = NODE_ENV === "production" ? PORT : 5000;
    app.listen(port, (err) => {
      if (err) {
        console.log("server", err);
        return;
      }

      console.log(
        `Server is running on port ${port} in ${NODE_ENV} environment`.green
      );
    });
  })
  .catch((err) => {
    console.log(`database error: ${err}`.magenta);
  });
