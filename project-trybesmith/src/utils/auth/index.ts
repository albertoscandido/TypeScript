import Token from '../../interfaces/token.interface';
import { BadRequestError } from 'restify-errors';
import jwt from 'jsonwebtoken';

const generateToken = (username: string, password: string) : Token => {
  const tokenObj: Token = { token: '' }
  tokenObj.token = jwt.sign({ username, password }, process.env.JWT_SECRET as string);
  return tokenObj;
}

const validateToken = (token: string) => {
  let validUser;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET as string, (err, user) => {
      if (err) return null;
      validUser = user;
    });
  }
  return validUser ? validUser : null;
};

export default {
  generateToken,
  validateToken
}