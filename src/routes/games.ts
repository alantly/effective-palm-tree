import { Game, GameType } from '../models';
import * as Express from 'express';
const router = Express.Router();

router.post('/games', (req, res, next) => {
  Game.create({ radiant: 'team 1', dire: 'team 2', matchId: Date.now() }).then((game) => {
    res.json({ game });
  });
});

export default router;
