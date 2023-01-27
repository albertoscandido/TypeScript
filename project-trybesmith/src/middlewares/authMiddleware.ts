import { NextFunction, Request, Response } from 'express';
import auth from '../utils/auth';
import statusCodes from '../enums/statusCodes';


export default class AuthMiddleware {
  public static authentication = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization as string;
    
    if (!token) {
      return res.status(statusCodes.UNAUTHORIZED).json({"message": "Token not found"});
    }
    
    const user = auth.validateToken(token);
    
    if (!user) {
      return res.status(statusCodes.UNAUTHORIZED).json({"message": "Invalid token"});
    }
    
    const { username, password } = user;
    req.body.username = username;
    req.body.password = password;
    
    return next();
  }
}