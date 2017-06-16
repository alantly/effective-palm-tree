import { Item, ItemType } from '../../../models';
import * as DB from 'mongoose';
import * as Express from 'express';
const router = Express.Router();

interface TriggerRequest {
  trigger_identity: string; // A unique identifier for this set of trigger fields
  triggerFields: object; // map of slug values
  user: object; // user info
  limit?: number;
  ifttt_source?: object; // Applet id and url
}

interface Trigger {
  meta: {
    id: string;
    timestamp: number;
  }
}

router.post('/trigger', (req, res, next) => {
  console.log('Trigger called');
  let body: TriggerRequest = req.body;

  if (body.limit === 0) return res.json({ data: [] });

  let limit = body.limit || 50;

  Item.create({ itemName: `hello ${Date.now()}`}).then(() => {
    Item.find().limit(limit).sort({ createdAt: -1 }).exec().then((items) => {

      let triggers: Trigger[] = items.map((item: ItemType) => {
        return {
          name: item.itemName,
          meta: {
            id: item._id,
            timestamp: Math.floor(item.createdAt.getTime()/1000),
          }
        }
      });

      res.json({ data: triggers });
    });
  });
});

export default router;
