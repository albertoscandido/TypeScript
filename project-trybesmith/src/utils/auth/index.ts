import Token from '../../interfaces/token.interface';
import { BadRequestError } from 'restify-errors';
import jwt from 'jsonwebtoken';

const generateToken = (username: string, password: string) : Token => {
  const tokenObj: Token = { token: '' }
  tokenObj.token = jwt.sign({ username, password }, process.env.JWT_SECRET as string);
  return tokenObj;
}

export default {
  generateToken
}