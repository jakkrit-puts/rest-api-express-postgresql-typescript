import express from "express";

import todoRoutes from "./routes/todo.router";
import connection from "./configs/database";

import { json, urlencoded } from "body-parser";

const app = express();

app.use(json());

app.use(urlencoded({ extended: true }));

app.use("/todos", todoRoutes);


connection
  .sync()
  .then(() => {
    console.log("Database successfully connected");
  })
  .catch((err) => {
    console.log("Database fail Error... ", err);
  });


app.listen(3005, () => {
  console.log("Server started on port 3005");
});

