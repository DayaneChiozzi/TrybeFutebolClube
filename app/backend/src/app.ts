import * as express from 'express';
import LoginController from './controller/loginController';
import ValidateLogin from './middleware/ValidateLogin';
import TeamsController from './controller/teamsController';

const loginController = new LoginController();
const validateLogin = new ValidateLogin();
const teamsController = new TeamsController();

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));
    this.app.post('/login', validateLogin.loginVerify, loginController.login);
    this.app.get('/login/validate', loginController.getLoginValidate);
    this.app.get('/teams', teamsController.getAll);
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
