import * as express from 'express';
const router = express.Router();

router.get('/status', (req, res, next) => {
  res.json({ key: 'value' });
});

export default router;
