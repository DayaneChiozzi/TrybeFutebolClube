import 'dotenv/config';
import { sign, verify, JwtPayload } from 'jsonwebtoken';

const secret = process.env.JWT_SECRET as string;

const createToken = (email:string) => {
  const token = sign({ email }, secret, { algorithm: 'HS256', expiresIn: '10d' });
  return token;
};

const tokenValidate = (token: string): JwtPayload => {
  const decoded = verify(token, secret);
  return decoded as JwtPayload;
};

export default { createToken, tokenValidate };
