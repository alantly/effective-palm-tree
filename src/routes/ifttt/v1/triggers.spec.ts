import * as Mocha from 'mocha';
import { expect } from 'chai';
import * as request from 'supertest';
import * as nock from 'nock';
import * as DB from 'mongoose';
import * as Express from 'express';
import * as BodyParser from 'body-parser';
import routes, { GameDataTrigger } from './triggers';
import { Game, GameType } from '../../../models';

const STEAM_RESPONSE = require('../../../../data/steam-api-response');

const app = Express();
app.use(BodyParser.json());
app.use(routes);

describe('Trigger routes', () => {

  beforeEach((done) => {
    DB.connect(process.env.MONGODB_URI_TEST, () => {
      DB.connection.db.dropDatabase(done);
    })
  })

  afterEach((done) => {
    DB.connection.close(done);
  })

  describe('post /new_dota_pro_game', () => {

    beforeEach(() => {
      nock('https://api.steampowered.com:443')
        .get('/IDOTA2Match_570/GetLiveLeagueGames/v0001/')
        .query({ key: process.env.STEAM_WEB_API })
        .reply(200, STEAM_RESPONSE);
    })

    it('sending limit 0 should return empty data', (done) => {
      request(app)
        .post('/new_dota_pro_game')
        .set('Accept', 'application/json')
        .send({ limit: 0 })
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.have.keys('data');
          expect(res.body.data).to.be.an('array');
          let data: GameDataTrigger[] = res.body.data;
          expect(data.length).to.be.eq(0);
          done();
        });
    });

    it('should successfully check games and return game data', (done) => {
      request(app)
        .post('/new_dota_pro_game')
        .expect(200)
        .end((err, res) => {
          let data: GameDataTrigger[] = res.body.data;
          expect(data.length).to.be.eq(1);
          let first = data[0];
          Game.find({ matchId: first.match_id }).then((obj: GameType[]) => {
            expect(obj[0].matchId).to.be.eq(first.match_id);
            expect(obj[0].radiant).to.be.eq(first.radiant);
            expect(obj[0].dire).to.be.eq(first.dire);
            done();
          }).catch((err) => {
            done(err);
          })
        });
    });
  });
});
