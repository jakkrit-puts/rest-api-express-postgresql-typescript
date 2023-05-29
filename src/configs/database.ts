import { Sequelize } from "sequelize-typescript";
import config from "../configs";
import { Dialect } from "sequelize";
import { Todos } from "../models/todo.model";
import { Users } from "../models/user.model";


const connection = new Sequelize({
  dialect: config.DB_DIARECT as Dialect,
  host: config.DB_HOST,
  port: Number(config.DB_PORT),
  username: config.DB_USERNAME,
  password: config.DB_PASSWORD,
  database: config.DB_DATABASE,
  logging: false,
  models: [Todos, Users],
});


export default connection;
