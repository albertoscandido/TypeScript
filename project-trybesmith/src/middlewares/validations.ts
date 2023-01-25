import { NextFunction, Request, Response } from 'express';
import joi from 'joi';
import statusCodes from '../enums/statusCodes';

export default class Validations {
  
  public static validateLogin = (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;
    
    const schema = joi.object({
      username: joi.string().required(),
      password: joi.string().required(),
    });


    const result = schema.validate(body);
    return result.error 
      ? res.status(statusCodes.BAD_REQUEST).json({message: result.error.message})
      : next();
  }

  public static validateProduct = (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;

    const schemaRequired = joi.object({
      name: joi.required(),
      amount: joi.required(),
    });

    const schemaEntity = joi.object({
      name: joi.string().min(3),
      amount: joi.string().min(3),
    });

    let result = schemaRequired.validate(body);
    if (result.error) {
      return res.status(statusCodes.BAD_REQUEST).json({message: result.error.message});
    }

    result = schemaEntity.validate(body);
    if (result.error) {
      return res.status(statusCodes.UNPROCESSABLE_ENTITY).json({message: result.error.message});
    }

    return next();
  }
}