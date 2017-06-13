import * as Express from 'Express';
import { normalizePort } from './utils';
import ifttt from './routes/ifttt';

const app = Express();
const API_BASE = '/api';

const headerHandler: Express.RequestHandler = (req, res, next) => {
  if (!req.accepts('application/json') || !req.acceptsCharsets('utf-8') ||
    !req.acceptsEncodings(['gzip', 'deflate'])) {
    res.status(406).send("Not Acceptable");
  }
  next();
}

app.use(API_BASE, headerHandler, ifttt);

app.use((req, res, next) => {
  res.status(404).send('Not Found');
});

const errorHandler: Express.ErrorRequestHandler = (err, req, res, next) => {
  res.status(500);
  res.send('Server Error');
}
app.use(errorHandler);

let port = normalizePort(process.env.PORT)
app.listen(port, function () {
  console.log('Example app listening on port 3000!')
})
