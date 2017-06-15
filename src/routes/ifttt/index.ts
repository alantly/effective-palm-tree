import * as Express from 'express';
const router = Express.Router();
import v1 from './v1';

const ROUTE_BASE = '/ifttt';

router.use(`${ROUTE_BASE}/v1`, v1);

export default router;
