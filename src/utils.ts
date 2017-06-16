export function normalizePort(val: string = '3000') {
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

export function validateEnv(keys: string[]) {
  keys.forEach((key) => {
    if (!(key in process.env)) {
      throw new Error('Missing API key in environment.');
    }
  })
}
