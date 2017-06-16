import * as Express from 'express';
const router = Express.Router();
import actions from './actions';
import triggers from './triggers';

router.use('/actions', actions);
router.use('/triggers', triggers);

router.get('/status', (req, res, next) => {
  res.end();
});

router.post('/test/setup', (req, res, next) => {
  res.json({
    data: {
      samples: {
        triggers: {
          new_dota_pro_game: {},
        },
        actions: {
          send_sms_message: {
            phone_number: '626-423-8125',
            message: 'test SMS message',
          }
        },
      }
    }
  });
});

// realtime api

// trigger fields
// dynamic options
// dynamic validations

export default router;
