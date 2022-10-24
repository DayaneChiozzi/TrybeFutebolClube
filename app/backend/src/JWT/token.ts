import 'dotenv/config';
import { sign } from 'jsonwebtoken';

const { JWT_SECRET } = process.env;

const createToken = (email:string) => {
  if (!JWT_SECRET) {
    throw new Error('Secret not Found');
  }
  const token = sign({ email }, JWT_SECRET, { algorithm: 'HS256', expiresIn: '10d' });
  return token;
};

export default { createToken };
