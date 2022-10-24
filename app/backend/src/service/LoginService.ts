import UserModel from '../database/models/UserModel';
import IToken from '../interface/IToken';
import IUser from '../interface/IUser';
import Token from '../JWT/token';

class LoginService {
  public model = UserModel;

  public login = async (email: string, password: string):Promise<IToken | string | undefined> => {
    try {
      const resultUser = await this.model.findOne({ where: { email, password } }) as IUser;
      console.log('SERVICE', resultUser);
      if (!resultUser) {
        throw new Error('email not found');
      }
      const generatedToken = Token.createToken(email);
      return generatedToken;
    } catch (error) {
      console.error(error);
    }
  };
}

export default LoginService;
