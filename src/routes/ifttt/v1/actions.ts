import * as Express from 'express';
const router = Express.Router();

router.get('/action', (req, res, next) => {
  console.log('Action called');
  res.json({
    data: [{ id: Date.now().toString() }]
  });
});

export default router;
