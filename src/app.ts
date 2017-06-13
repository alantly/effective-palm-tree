import * as express from 'express';
import ifttt from './routes/ifttt/v1/ifttt-controller';

const app = express();
const BASE_API = '/api';
const BASE_IFTTT_ROUTE = BASE_API + '/ifttt/v1';

app.use(BASE_IFTTT_ROUTE, ifttt);

function normalizePort(val: string = '3000') {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return 3000;
}

let port = normalizePort(process.env.PORT)
app.listen(port, function () {
  console.log('Example app listening on port 3000!')
})
