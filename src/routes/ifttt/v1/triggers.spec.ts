import * as Mocha from 'mocha';
import { expect } from 'chai';
import { stub } from 'sinon';
import * as request from 'supertest';
import * as fetchMock from 'fetch-mock';

import * as Express from 'express';
import * as BodyParser from 'body-parser';
import routes from './triggers';

import * as DB from 'mongoose';
let insertStub = stub(DB.Model, 'insertMany');

const steamMockData = {
  result: {
    games: [
      {
        radiant_team: 'r_team_1',
        dire_team: 'd_team_1',
        league_tier: 2,
        match_id: 12345,
      }
    ]
  }
}

const app = Express();
app.use(BodyParser.json());
app.use(routes);

describe('Trigger routes', () => {
  describe('post /new_dota_pro_game', () => {
    afterEach(() => {
      fetchMock.get('*', steamMockData);
    })
    afterEach(() => {
      fetchMock.restore();
    })
    it('sending limit 0 should return empty data', (done) => {
      request(app)
        .post('/new_dota_pro_game')
        .set('Accept', 'application/json')
        .send({ limit: 0 })
        .expect(200)
        .expect({ data: [] }, done);
    });

    // it('should successfully check games and return game data', (done) => {
    //   request(app)
    //     .post('/new_dota_pro_game')
    //     .expect(200)
    //     .expect({ data: [] }, done);
    // });
  });
});
