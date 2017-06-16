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
      // accessToken: "taSvYgeXfM1HjVISJbUXVBIw1YUkKABm",
      samples: {
        triggers: {
          trigger: {},
        },
        actions: {
          action: {}
        },
      }
    }
  });
});

// realtime api

// trigger fields
// dynamic options
// dynamic validations

// action fields
// dynamic options

export default router;
