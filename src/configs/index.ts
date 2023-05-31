import * as dotenv from "dotenv";
dotenv.config();

const config = {
  PORT: process.env.PORT || "3000",

  DB_USERNAME: process.env.DB_USERNAME || '',
  DB_PASSWORD: process.env.DB_PASSWORD || '',
  DB_DATABASE: process.env.DB_DATABASE || '',
  DB_HOST: process.env.DB_HOST || '',
  DB_DIARECT: process.env.DB_DIARECT || '',
  DB_PORT: process.env.DB_PORT || '',
  DB_TIME_ZONE: process.env.DB_TIME_ZONE || '',

  SALT: process.env.SALT || "",
  JWT_SECRET: process.env.JWT_SECRET || "",
  JWT_EXP: process.env.JWT_EXP || "",
};

export default config;
