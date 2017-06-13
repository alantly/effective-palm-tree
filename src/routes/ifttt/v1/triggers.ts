import * as Express from 'Express';
const router = Express.Router();

router.get('/trigger', (req, res, next) => {
  res.json({ key: 'trigger' });
});

export default router;
