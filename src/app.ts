import * as Express from 'express';
import * as BodyParser from 'body-parser';
import { connect } from './models';
import { normalizePort } from './utils';
import ifttt from './routes/ifttt';

const app = Express();
const API_BASE = '/api';

const IFTTT_KEY = 'ek6P4HrcvePVHcvan-9OWxt2stp6yrvjLPJmCXjX0tLuq4H4-h94c0NO3BKMY9at';

// Verify Headers
app.use((req, res, next) => {
  if (!req.accepts('application/json') || !req.acceptsCharsets('utf-8') ||
    !req.acceptsEncodings(['gzip', 'deflate'])) {
    res.status(406).send("Not Acceptable");
  }
  next();
});

// Verify Channel Key
app.use((req, res, next) => {
  let key = req.header('IFTTT-Channel-Key');
  if (key === IFTTT_KEY) {
    next();
  } else {
    res.status(401).json({
      errors: [{ message: 'Invalid IFTTT Channel Key' }],
    });
  }
});

app.use(BodyParser.json());

app.use(API_BASE, ifttt);

app.use((req, res, next) => {
  res.status(404).send('Not Found');
});

const errorHandler: Express.ErrorRequestHandler = (err, req, res, next) => {
  res.status(500);
  res.send('Server Error');
}
app.use(errorHandler);

connect((err) => {
  if (err) throw err;

  let port = normalizePort(process.env.PORT)
  app.listen(port, () => {
    console.log('Listening on port 3000!');
  });
});
