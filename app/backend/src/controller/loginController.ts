import { Request, Response } from 'express';
import LoginService from '../service/LoginService';

class LoginController {
  constructor(protected loginService = new LoginService()) { }

  public login = async (req: Request, res: Response): Promise<Response> => {
    const { email, password } = req.body;
    const resultToken = await this.loginService.login(email, password);

    if (!resultToken) {
      return res.status(404).json({ message: 'email or password not found!' });
    }
    return res.status(200).json(resultToken);
  };
}

export default LoginController;
