import * as sinon from 'sinon';
import * as chai from 'chai';
import * as bcrypt from 'bcryptjs';
import * as Jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
// import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';
import teams from './mocks';
import UserModel from '../database/models/UserModel';
import TeamsModel from '../database/models/TeamsModel';

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

    expect(httpResponse.status).to.equal(StatusCodes.BAD_REQUEST);
    expect(httpResponse.body).to.deep.equal({ message: 'All fields must be filled' })
  });

  it('Quando o campo password não é informado retornar status 400', async () => {
    const httpResponse = await chai.request(app).post('/login')
      .send({ email: 'user@user.com' })

    expect(httpResponse.status).to.equal(StatusCodes.BAD_REQUEST);
    expect(httpResponse.body).to.deep.equal({ message: 'All fields must be filled' })
  });

  it('Quando um password é incorreto retornar status 401', async () => {
    const httpResponse = await chai.request(app).post('/login')
      .send({ email: 'user@user.com', password: 'secret_admin' })

    expect(httpResponse.status).to.equal(StatusCodes.UNAUTHORIZED);
    expect(httpResponse.body).to.deep.equal({ message: 'Incorrect email or password' })
  });

  it('retorna  status 200 como response e um token válido na messagem', async () => {
    const httpResponseLogin = await chai.request(app).post('/login')
      .send({ email: 'admin@admin.com', password: 'secret_admin' });

    expect(httpResponseLogin.body).to.have.property('token')
    expect(httpResponseLogin.status).to.equal(StatusCodes.OK);
  })
});

describe('GET /login/validate', () => {
  beforeEach(() => {
    sinon.stub(UserModel, 'findOne').resolves(user as UserModel)
  });

  afterEach(() => { (UserModel.findOne as sinon.SinonStub).restore()});

  it('GET/login/validate" retorne token valido e com status 200', async () => {
    const httpResponse = await chai.request(app)
      .get('/login/validate')
      .set('authorization', token)
      
      expect(httpResponse.status).to.equal(StatusCodes.OK);
      expect({role:httpResponse.body.role}).to.deep.equal({ role: user.role })
  });
});

describe('GET /teams', () => {
  it('GET/teams" retorna um array de times e com status 200', async () => {
    const httpResponse = await chai.request(app)
      .get('/teams')
      
      expect(httpResponse.status).to.equal(StatusCodes.OK);
      expect(httpResponse.body).to.deep.equal(teams)
  });

  it('GET/teams/:id" retorna um time com status 200', async () => {
    const httpResponse = await chai.request(app)
      .get('/teams/16')

      console.log(httpResponse.body)
      
      expect(httpResponse.status).to.equal(StatusCodes.OK);
      expect(httpResponse.body).to.deep.equal(teams[15])
  })
  it('GET/teams/:id" retorna null quando id nao existe', async () => {
    const httpResponse = await chai.request(app)
      .get('/teams/17')

      
      
      expect(httpResponse.status).to.equal(StatusCodes.OK);
      expect(httpResponse.body).to.deep.equal(null);
  })
});
