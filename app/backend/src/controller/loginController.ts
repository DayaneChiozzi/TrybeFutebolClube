import { Request, Response } from 'express';
import LoginService from '../service/LoginService';
import token from '../JWT/token';
import IToken from '../interface/IToken';

class LoginController {
  constructor(protected loginService = new LoginService()) { }

  public login = async (req: Request, res: Response): Promise<Response | IToken> => {
    const { email } = req.body;
    const result = await this.loginService.login(email);
    if (!result) {
      return res.status(404).json({ message: 'email or password not found!' });
    }
    const resultToken = token.createToken(email);
    return res.status(200).json({ token: resultToken });
  };
}

export default LoginController;
