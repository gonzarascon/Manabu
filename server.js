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

const api = require('./api');

app.prepare().then(() => {
  const server = express();

  server.use(cookieParser());
  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({ extended: true }));
  server.use(cors());

  server.get('/', (req, res) => {
    api.main
      .getBasicData()
      .then(data => {
        app.render(req, res, '/', { basicData: data });
      })
      .catch(error => {
        console.error('server-error', error);
        console.log(res);
      });
  });

  server.get('/sw.js', (req, res) => {
    res.setHeader('content-type', 'text/javascript');
    return res.sendFile(path.join(`${__dirname}/static/serviceWorker.js`));
  });

  // User

  server.post('/form-login', (req, res) => {
    const { username, password } = req.body;
    api.user
      .login(username, password)
      .then(data => {
        if (data !== null) {
          const { token } = data;
          res.cookie('token', token, {
            maxAge: new Date(Date.now() + 900000),
            httpOnly: true,
          });
          console.log('cookie created successfully', token);
        }
        res.end();
      })
      .catch(error => {
        console.error('server-error', error);
        console.log(res);
      });
  });

  server.get('/actual-user', (req, res) => {
    const { token } = req.query;

    api.user
      .getActualUser(token)
      .then(data => {
        const actualUser = data;
        res.json({ user: actualUser });
      })
      .catch(error => {
        console.error('server-error', error);
        console.log(res);
        res.status(401).send('AUTH_ERROR');
      });
  });

  // Courses
  server.get('/course/:id', (req, res) => {
    const courseId = req.params.id;
    api.course
      .getBasicData(courseId)
      .then(data => {
        app.render(req, res, '/course', { courseData: data });
      })
      .catch(error => {
        console.error('server-error', error);
        console.log(res);
      });
  });

  server.get('/posts/:id', (req, res) => {
    return app.render(req, res, '/posts', { id: req.params.id });
  });

  server.get('/users/:username', (req, res) => {
    return app.render(req, res, '/users', { username: req.params.username });
  });

  server.get('/catalog', (req, res) => {
    return app.render(req, res, '/catalog');
  });

  server.get('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
