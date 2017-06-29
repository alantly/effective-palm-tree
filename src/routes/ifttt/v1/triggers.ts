import * as DB from 'mongoose';
import * as Express from 'express';
import fetch from 'node-fetch';
import { Game, GameType } from '../../../models';
const router = Express.Router();

interface TriggerRequest {
  trigger_identity: string; // A unique identifier for this set of trigger fields
  triggerFields: object; // map of slug values
  user: object; // user info
  limit?: number;
  ifttt_source?: object; // Applet id and url
}

interface TriggerMetaData {
  meta: {
    id: string;
    timestamp: number;
  }
}

export interface GameDataTrigger extends TriggerMetaData {
  radiant: string;
  dire: string;
  match_id: number;
}

const DOTA_GAMES = `https://api.steampowered.com/IDOTA2Match_570/GetLiveLeagueGames/v0001/?key=${process.env.STEAM_WEB_API}`;

router.post('/new_dota_pro_game', (req, res, next) => {
  let body: TriggerRequest = req.body;

  if (body.limit === 0) return res.json({ data: [] });

  let limit = body.limit || 50;
  fetch(DOTA_GAMES, { headers: { 'accept-encoding': 'identity' }}).then((resp) => {
    return resp.json()
  }).then((gameData) => {
    let parsedGames = parse(gameData);
    Game.insertMany(parsedGames).catch((e) => {
      // ignore duplicate ids
    }).then(() => {
      return Game.find().limit(limit).sort({ createdAt: -1 }).exec();
    }).then((games) => {
      let triggers = createTriggers(games as GameType[]);
      res.json({ data: triggers });
    });
  }).catch((e) => {
    console.error(e);
    res.status(503).end();
  });
});

function validateResponse(data: any) {
  // json schema
  return data
}

function parse(gameData: any): GameType[] {
  let games: GameType[] = gameData.result.games.filter((game: any) => {
    return game.league_tier === 2;
  }).map((game: any) => {
    return {
      radiant: game.radiant_team.team_name as string,
      dire: game.dire_team.team_name as string,
      matchId: game.match_id as number,
    }
  });

  // sort in decending order. Assume newer games have older match ids
  return games.sort((a, b) => {
    return b.matchId - a.matchId;
  });
}

function createTriggers(games: GameType[]): GameDataTrigger[] {
  return games.map((game: GameType) => {
    return {
      radiant: game.radiant,
      dire: game.dire,
      match_id: game.matchId,
      meta: {
        id: game._id,
        timestamp: Math.floor(game.createdAt.getTime()/1000),
      }
    }
  });
}

export default router;
