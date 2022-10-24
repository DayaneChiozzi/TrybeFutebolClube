import { NextFunction, Request, Response } from 'express';
import LoginService from '../service/LoginService';

class ValidateLogin {
  loginService = new LoginService();

  public loginVerify = async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;
    const result = await this.loginService.login(email);
    if (!result?.email || !result.password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    // console.log('validateLogin', result);
    next();
  };
}

export default ValidateLogin;
