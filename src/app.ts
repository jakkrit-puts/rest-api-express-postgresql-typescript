import express from "express";
import { json, urlencoded } from "body-parser";
import path from "path";
import cors from 'cors';
import morgan from 'morgan';

import connection from "./configs/database";
import config from "./configs";
import { errorHandler } from "./middlewares/error_handler";

import indexRoutes from "./routes/index.router";
import authRoutes from "./routes/auth.router";
import userRoutes from "./routes/user.router";
import todoRoutes from "./routes/todo.router";


const app = express();

app.use(cors());
app.use(morgan('dev'))
app.use(json({limit: "2mb" }));
app.use(urlencoded({ limit: "2mb", extended: true }));
app.use(express.static(path.join(__dirname, "public")));


app.use("/", indexRoutes);
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/todo", todoRoutes);


app.use(errorHandler)

connection
  .sync()
  .then(() => {
    console.log("--------------------------------------------------------");
    console.log("Database successfully connected");
  })
  .catch((err) => {
    console.log("--------------------------------------------------------");
    console.log("Database fail Error... ", err);
  });


app.listen(config.PORT, () => {
  console.log("---------------------------------------------------------");
  console.log(`Server started on port http://localhost:${config.PORT} `);
  console.log("---------------------------------------------------------");
});

