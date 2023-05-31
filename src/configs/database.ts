import { Sequelize } from "sequelize-typescript";
import config from "../configs";
import { Dialect } from "sequelize";

import { User } from "../models/user.model";
import { Todo } from "../models/todo.model";

const connection = new Sequelize({
  dialect: config.DB_DIARECT as Dialect,
  host: config.DB_HOST,
  port: Number(config.DB_PORT),
  username: config.DB_USERNAME,
  password: config.DB_PASSWORD,
  database: config.DB_DATABASE,
  timezone: config.DB_TIME_ZONE,
  models: [User, Todo]
});

export default connection;
