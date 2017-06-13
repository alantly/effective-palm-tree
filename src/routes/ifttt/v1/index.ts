import * as Express from 'Express';
import actions from './actions';
import triggers from './triggers';
const router = Express.Router();

router.use('/actions', actions);
router.use('/triggers', triggers);

router.get('/status', (req, res, next) => {
  res.end();
});

export default router;
