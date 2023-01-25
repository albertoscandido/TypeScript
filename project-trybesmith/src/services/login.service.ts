import connection from '../models/connection';
import UserModel from '../models/user.model';
import User from '../interfaces/user.interface';
import auth from '../utils/auth/index';
import Token from '../interfaces/token.interface';
import { BadRequestError } from 'restify-errors';

export default class LoginService {
  public model: UserModel;

  constructor() {
    this.model = new UserModel(connection);
  }

  public async login(username: string, password: string): Promise<Token | null> {
    const result: User[] = await this.model.getUserByUsernameAndPassword(username, password);

    return result.length > 0 ? auth.generateToken(result[0].username, result[0].password) : null;
  }
}