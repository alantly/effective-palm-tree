import * as Express from 'express';
const router = Express.Router();
import actions from './actions';
import triggers from './triggers';

router.use('/actions', actions);
router.use('/triggers', triggers);

router.get('/status', (req, res, next) => {
  res.end();
});

export default router;
