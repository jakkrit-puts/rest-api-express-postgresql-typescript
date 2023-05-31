import { Sequelize } from "sequelize-typescript";
import config from "../configs";
import { Dialect } from "sequelize";

import { Users } from "../models/user.model";
import { Todos } from "../models/todo.model";

const connection = new Sequelize({
  dialect: config.DB_DIARECT as Dialect,
  host: config.DB_HOST,
  port: Number(config.DB_PORT),
  username: config.DB_USERNAME,
  password: config.DB_PASSWORD,
  database: config.DB_DATABASE,
  timezone: config.DB_TIME_ZONE,
  models: [Users, Todos]
});

export default connection;
