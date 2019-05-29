const express = require('express');
const next = require('next');
const path = require('path');

const dev = process.env.NODE_ENV === 'development';
const port = parseInt(process.env.PORT, 10) || 3002;
const app = next({
  dev: process.env.NODE_ENV !== 'production' && !process.env.NOW,
});
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.get('/sw.js', (req, res) => {
    res.setHeader('content-type', 'text/javascript');
    return res.sendFile(path.join(`${__dirname}/static/serviceWorker.js`));
  });

  server.get('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
