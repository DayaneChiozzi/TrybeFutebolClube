import UserModel from '../database/models/UserModel';
import IUser from '../interface/IUser';

class LoginService {
  public model = UserModel;

  public login = async (email: string):Promise<IUser | undefined> => {
    try {
      const resultUser = await this.model.findOne({
        where: { email }, raw: true,
      }) as IUser;
      if (!resultUser) {
        throw new Error('email not found');
      } return resultUser;
    } catch (error) {
      console.error(error);
    }
  };
}

export default LoginService;
