const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const next = require('next');
const path = require('path');
const cors = require('cors');

const dev = process.env.NODE_ENV !== 'production';
const port = parseInt(process.env.PORT, 10) || 3002;
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.use(cookieParser());
  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({ extended: true }));
  server.use(cors());

  server.get('/sw.js', (req, res) => {
    res.setHeader('content-type', 'text/javascript');
    return res.sendFile(path.join(`${__dirname}/static/serviceWorker.js`));
  });

  server.get('/course/:id', (req, res) => {
    return app.render(req, res, '/course', { id: req.params.id });
  });

  server.get('/posts/:id', (req, res) => {
    return app.render(req, res, '/posts', { id: req.params.id });
  });

  server.get('/users/:username', (req, res) => {
    return app.render(req, res, '/users', { username: req.params.username });
  });

  server.get('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
