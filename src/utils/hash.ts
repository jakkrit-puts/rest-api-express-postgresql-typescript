import bcrypt from "bcrypt";
import config from "../configs";

export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(Number(config.SALT));
  const hashPassword = await bcrypt.hash(password, salt);
  return hashPassword;
};