import { NextFunction, Request, Response } from 'express';
import joi from 'joi';
import statusCodes from '../enums/statusCodes';

export default class Validations {
  
  public static validateLogin = (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;
    console.log(body);
    
    const schema = joi.object({
      username: joi.string().required(),
      password: joi.string().required(),
    });


    const result = schema.validate(body);
    return result.error 
      ? res.status(statusCodes.BAD_REQUEST).json({message: result.error.message})
      : next();
  }

}