import * as Mocha from 'mocha';
import { expect } from 'chai';
import * as Express from 'express';
import * as request from 'supertest';
import routes from './index';

const app = Express();
app.use(routes);

describe('Index routes', () => {
  describe('get /status', () => {
    it('should return successfully', (done) => {
      request(app)
        .get('/status')
        .expect(200, done);
    });
  });

  describe('post /test/setup', () => {
    it('should return a sample of the action and triggers', (done) => {
      request(app)
        .post('/test/setup')
        .expect(200)
        .then((resp) => {
          expect(resp.body).has.nested.property('data.samples.triggers.new_dota_pro_game');
          expect(resp.body).has.nested.property('data.samples.actions.send_sms_message');
        })
        .then(done);
    });
  });
});
