import { Request, Response } from 'express';
import statusCodes from '../enums/statusCodes';
import LoginService from '../services/login.service';

export default class UserController {
  constructor(private loginService = new LoginService()) {}

  public getUserByUsernameAndPassword = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    
    const token = await this.loginService.login(username, password);
    
    return token ? res.status(statusCodes.OK).json(token)
      : res.status(statusCodes.UNAUTHORIZED).json({message: 'Username or password invalid'});
  };
}