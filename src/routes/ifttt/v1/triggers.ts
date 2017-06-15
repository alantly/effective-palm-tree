import { Item, ItemType } from '../../../models';
import * as DB from 'mongoose';
import * as Express from 'express';
const router = Express.Router();

interface Trigger {
  meta: {
    id: string;
    timestamp: number;
  }
}

router.get('/trigger', (req, res, next) => {
  console.log('Trigger called');

  Item.create({ itemName: `hello ${Date.now()}`}).then(() => {
    Item.find().limit(50).sort({ createdAt: -1 }).exec().then((items) => {

      let triggers: Trigger[] = items.map((item: ItemType) => {
        return {
          name: item.itemName,
          meta: {
            id: item._id,
            timestamp: item.createdAt.getTime(),
          }
        }
      });

      res.json({
        data: triggers,
      });
    });
  });

});

export default router;
