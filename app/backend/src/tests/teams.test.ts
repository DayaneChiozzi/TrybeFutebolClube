import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

// import { Response } from 'superagent';
import teams from './mocks'; 


chai.use(chaiHttp);
const { expect } = chai;

describe('GET /teams', () => {
  it('GET/teams" retorna um array de times e com status 200', async () => {
    const httpResponse = await chai.request(app)
      .get('/teams')

    expect(httpResponse.status).to.equal(200);
    expect(httpResponse.body).to.deep.equal(teams)
  });

  it('GET/teams/:id" retorna um time com status 200', async () => {
    const httpResponse = await chai.request(app)
      .get('/teams/16')

    expect(httpResponse.status).to.equal(200);
    expect(httpResponse.body).to.deep.equal(teams[15])
  })
  it('GET/teams/:id" retorna null quando id nao existe', async () => {
    const httpResponse = await chai.request(app)
      .get('/teams/17')

    expect(httpResponse.status).to.equal(200);
    expect(httpResponse.body).to.deep.equal(null);
  })
});
