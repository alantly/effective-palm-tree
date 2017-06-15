import * as DB from 'mongoose';

export interface ItemType extends DB.Document {
  itemName: string;
  createdAt: Date;
}

export const Item = DB.model('Item', new DB.Schema({
  itemName: String,
}, {
  timestamps: { createdAt: 'createdAt' }
}));
