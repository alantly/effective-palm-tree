import * as DB from 'mongoose';

export interface GameType extends DB.Document {
  radiant: string;
  dire: string;
  matchId: number;
  createdAt: Date;
}

export const Game = DB.model('Game', new DB.Schema({
  radiant: String,
  dire: String,
  matchId: {
    type:Number,
    required: true,
    unique: true,
    index: true,
  },
}, {
  timestamps: { createdAt: 'createdAt' }
}));
