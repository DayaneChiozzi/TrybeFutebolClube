import * as sinon from 'sinon';
import * as chai from 'chai';
import * as bcrypt from 'bcryptjs'; 
import * as Jwt from 'jsonwebtoken'; 
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import UserModel from '../database/models/UserModel';


chai.use(chaiHttp);
const { expect } = chai;

const SECRET = process.env.JWT_SECRET as string;

const user = {
  email: 'user@user.com',
  password: bcrypt.hashSync('Alg-Cost-Salt-Hash'),
  role: 'user',
}

const token = Jwt.sign(
  { userEmail: user.email }, SECRET,
  { algorithm: 'HS256', expiresIn: '10d' },
);


describe('POST / login', () => {

  it('Quando o campo e-mail não é informado retornar status 400', async () => {
    const httpResponse = await chai.request(app).post('/login')
      .send({ password: 'qualquerPassword' })

    expect(httpResponse.status).to.equal(400);
    expect(httpResponse.body).to.deep.equal({ message: 'All fields must be filled' })
  });

  it('Quando o campo password não é informado retornar status 400', async () => {
    const httpResponse = await chai.request(app).post('/login')
      .send({ email: 'user@user.com' })

    expect(httpResponse.status).to.equal(400);
    expect(httpResponse.body).to.deep.equal({ message: 'All fields must be filled' })
  });

  it('Quando um password é incorreto retornar status 401', async () => {
    const httpResponse = await chai.request(app).post('/login')
      .send({ email: 'user@user.com', password: 'secret_admin' })

    expect(httpResponse.status).to.equal(401);
    expect(httpResponse.body).to.deep.equal({ message: 'Incorrect email or password' })
  });

  it('retorna  status 200 como response e um token válido na messagem', async () => {
    const httpResponseLogin = await chai.request(app).post('/login')
      .send({ email: 'admin@admin.com', password: 'secret_admin' });

    expect(httpResponseLogin.body).to.have.property('token')
    expect(httpResponseLogin.status).to.equal(200);
  })
});

describe('GET /login/validate', () => {
  beforeEach(() => {
    sinon.stub(UserModel, 'findOne').resolves(user as UserModel)
  });

  afterEach(() => { (UserModel.findOne as sinon.SinonStub).restore() });

  it('GET/login/validate" retorne token valido e com status 200', async () => {
    const httpResponse = await chai.request(app)
      .get('/login/validate')
      .set('authorization', token)

    expect(httpResponse.status).to.equal(200);
    expect({ role: httpResponse.body.role }).to.deep.equal({ role: user.role })
  });
});