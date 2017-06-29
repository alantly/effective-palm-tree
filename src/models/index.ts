import * as DB from 'mongoose';

const DB_URL = process.env.MONGODB_URI;

type callback = (err?: Error) => void;

export function connect(done: callback) {
  DB.connect(DB_URL);
  let connection = DB.connection;
  connection.on('error', (err: Error) => {
    console.error('DB Connection Error');
    done(err);
  });
  connection.once('open', () => {
    // we're connected!
    console.log("Database created!");
    done();
  });
}

export * from './game';
