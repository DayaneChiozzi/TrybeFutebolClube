import { NextFunction, Request, Response } from 'express';
import LoginService from '../service/LoginService';

class ValidateLogin {
  loginService = new LoginService();

  public loginVerify = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    const result = await this.loginService.login(email, password);
    if (!result) {
      return res.status(401).json({ message: 'Incorrect email or password' });
    }
    next();
  };
}

export default ValidateLogin;
