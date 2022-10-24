import 'dotenv/config';
import { sign } from 'jsonwebtoken';

const secret = process.env.JWT_SECRET as string;

const createToken = (email:string) => {
  const token = sign({ email }, secret, { algorithm: 'HS256', expiresIn: '10d' });
  return token;
};

export default { createToken };
