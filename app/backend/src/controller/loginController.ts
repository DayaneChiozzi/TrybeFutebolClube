import { Request, Response } from 'express';
import LoginService from '../service/LoginService';
import token from '../JWT/token';
import IToken from '../interface/IToken';

class LoginController {
  constructor(protected loginService = new LoginService()) { }

  public login = async (req: Request, res: Response): Promise<Response | IToken> => {
    const { email } = req.body;
    const resultToken = token.createToken(email);
    return res.status(200).json({ token: resultToken });
  };

  public getLoginValidate = async (req: Request, res: Response): Promise<Response> => {
    const { authorization } = req.headers;
    const validateToken = token.tokenValidate(authorization as string);
    const result = await this.loginService.getLoginValidate(validateToken.email);
    return res.status(200).json(result);
  };
}

export default LoginController;
