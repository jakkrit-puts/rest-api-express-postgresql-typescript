import { RequestHandler } from "express";
import { validationResult } from "express-validator";

import { User } from "../models/user.model";
import { hashPassword } from "../utils/hash";
import { BadRequestError, ConflictError, NotFoundError, ValidationError } from "../utils/error";

import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";

import config from "../configs";
import uploadImageBase64 from "../utils/upload_file";

export const login: RequestHandler = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const error = new ValidationError(errors.array())
      throw error
    }

    const payload = req.body

    const user = await User.findOne({ where:{ username: payload.username } }); 
    if(!user){
      throw new BadRequestError('username incorrect or not found')
    }   
    
    const isPasswordMatch = bcrypt.compareSync(payload.password, user.password);
    if(!isPasswordMatch){
      throw new BadRequestError('password incorrect')
    }  

    const token = jwt.sign({
      id: user.id,
      role: user.role
    }, config.JWT_SECRET, { expiresIn: config.JWT_EXP })
    
   return res.status(200).json({ 
      status: true, 
      result: { 
        access_token: token,
      }, 
      message: "login success" 
    });

  } catch (error) {
    next(error);
  }
};

export const register: RequestHandler = async (req, res, next) => {
 try {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new ValidationError(errors.array());
    throw error;
  }

  const payload = req.body

  const userExist = await User.findOne({  where: { username: payload.username } })
  if (userExist) {
    throw new ConflictError('username already exist')
  }
  
  let user = new User();
  user.username = payload.username;
  user.password = await hashPassword(payload.password)
  user.fullname = payload.fullname
  user.image_profile =  payload.image_profile ? await uploadImageBase64(payload.image_profile, "profile") : 'no_picture.png'

  await user.save()
  
  return res.status(201).json({ status: true, result: user, message: "created success" });
 } catch (error) {
  next(error);
 }
};
