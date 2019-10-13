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
    return app.render(req, res, '/', { basicData });
  });

  server.get('/sw.js', (req, res) => {
    res.setHeader('content-type', 'text/javascript');
    return res.sendFile(path.join(`${__dirname}/static/serviceWorker.js`));
  });

  // User

  server.post('/form-login', (req, res) => {
    const {
      value: { username, password }
    } = req.body;
    api.user
      .login(username, password)
      .then(async data => {
        const { id } = data;
        res.cookie('token', id, {
          maxAge: new Date(Date.now() + 900000),
          // httpOnly: true,
          overwrite: true
        });
        console.log('cookie created successfully', id);
        const actualUser = await api.user.getActualUser(id);

        return res.send({ token: id, actualUser });
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

  server.post('/users/logout', (req, res) => {
    const { route, access_token } = req.body;
    api.user
      .logout(access_token)
      .then(response => {
        console.log(response.data);
        res.redirect('/');
      })
      .catch(error => `Can't Logout`);
  });

  server.get('/users/me', async (req, res) => {
    const { access_token } = req.query;

    const actualUser = await api.user.getActualUser(access_token);
    console.log('actualUser', actualUser);
    return res.json(actualUser);
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

  server.get('/users/profile/:user_id', async (req, res) => {
    const { at } = req.query;
    const userData = await api.user.getUserProfile(req.params.user_id, at);

    console.log('userData', userData[0]);

    return app.render(req, res, '/users', { userData: userData[0] });
  });

  server.get('/catalog', (req, res) => app.render(req, res, '/catalog'));

  server.get('*', (req, res) => handle(req, res));

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
