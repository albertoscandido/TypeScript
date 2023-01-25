import connection from '../models/connection';
import UserModel from '../models/user.model';
import User from '../interfaces/user.interface';
import auth from '../utils/auth/index';
import Token from '../interfaces/token.interface';
import { BadRequestError } from 'restify-errors';

const properties = ['username', 'vocation', 'level', 'password'];

export default class UserService {
  public model: UserModel;

  constructor() {
    this.model = new UserModel(connection);
  }

  static validateProperties(user: User): [boolean, string | null] {
    for (let i = 0; i < properties.length; i += 1) {
      if (!Object.prototype.hasOwnProperty.call(user, properties[i])) {
        return [false, properties[i]];
      }
    }
    return [true, null];
  }
  
  static validateValues(user: User): [boolean, string | null] {
    const entries = Object.entries(user);
    for (let i = 0; i < entries.length; i += 1) {
      const [property, value] = entries[i];
      if (!value) {
        return [false, property];
      }
    }
    return [true, null];
  }
  
  static validationUser(user: User): void | string {
    let [valid, property] = UserService.validateProperties(user);
  
    if (!valid){
      return `O campo ${property} é obrigatório.`;
    }
    [valid, property] = UserService.validateValues(user);
  
    if (!valid) {
      return `O campo ${property} não pode ser nulo ou vazio.`;
    }
  }

  public async create(user: User): Promise<Token> {
    const isValidUser = UserService.validationUser(user);
  
    if (typeof isValidUser === 'string') {
      throw new BadRequestError(isValidUser);
    }
    const { id, username, password } = await this.model.create(user);
    const token: Token = auth.generateToken(username, password);
    return token;
  }
}