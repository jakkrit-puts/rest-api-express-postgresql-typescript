import express from "express";

import connection from "./configs/database";
import { json, urlencoded } from "body-parser";
import config from "./configs";


import todoRoutes from "./routes/todo.router";
import indexRoutes from "./routes/index.router";

const app = express();

app.use(json());

app.use(urlencoded({ extended: true }));

app.use("/", indexRoutes);
app.use("/todos", todoRoutes);

connection
  .sync()
  .then(() => {
    console.log("Database successfully connected");
  })
  .catch((err) => {
    console.log("Database fail Error... ", err);
  });


app.listen(config.PORT, () => {
  console.log(`Server started on port http://localhost:${config.PORT} `);
});

