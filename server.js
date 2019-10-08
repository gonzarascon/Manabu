/* eslint-disable no-console */

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

  server.get('/', async (req, res) => {
    const basicData = await api.main.getBasicData();
    console.log('server Basic data', basicData);
    return app.render(req, res, '/', { basicData });
  });

  server.get('/sw.js', (req, res) => {
    res.setHeader('content-type', 'text/javascript');
    return res.sendFile(path.join(`${__dirname}/static/serviceWorker.js`));
  });

  // User

  server.post('/form-login', (req, res) => {
    const {
      value: { username, password },
      route
    } = req.body;
    api.user
      .login(username, password)
      .then(data => {
        if (data !== null) {
          const { token } = data;
          res.cookie('token', token, {
            maxAge: new Date(Date.now() + 900000),
            httpOnly: true,
            overwrite: true
          });
          console.log('cookie created successfully', token);
          api.user
            .getActualUser(token)
            .then(user => {
              const actualUser = user;
              app.render(req, res, route, actualUser);
            })
            .catch(error => console.error('could not get actual user', error));
        }
      })
      .catch(error => {
        console.error('server-error', error);
        res.send('AUTH_FAILED');
      });
  });

  server.post('/user/create', (req, res) => {
    const { formValue } = req.body;

    api.user
      .create(formValue)
      .then(data => app.render(req, res, '/', data))
      .catch(error => 'CREATE_USER_ERROR');
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
        console.log('AUTH_ERROR');
        res.status(401).send('AUTH_ERROR');
      });
  });

  server.post('/users/logout/:username', (req, res) => {
    res.cookie('token', 'NO_TOKEN', {
      maxAge: Date.now(),
      overwrite: true,
      httpOnly: true
    });
    const { route } = req.body;
    app.render(req, res, route, req.query);
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

  server.get('/posts/:id', (req, res) =>
    app.render(req, res, '/posts', { id: req.params.id })
  );

  server.get('/users/profile/:username', (req, res) =>
    app.render(req, res, '/users', { username: req.params.username })
  );

  server.get('/catalog', (req, res) => app.render(req, res, '/catalog'));

  server.get('*', (req, res) => handle(req, res));

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
