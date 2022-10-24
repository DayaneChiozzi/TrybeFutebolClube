import { NextFunction, Request, Response } from 'express';
import LoginService from '../service/LoginService';

class ValidateLogin {
  loginService = new LoginService();

  public loginVerify = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const result = await this.loginService.login(email);

    if (!email || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    if (!result) {
      return res.status(404).json({ message: 'email or password not found!' });
    }
    next();
  };
}

export default ValidateLogin;
