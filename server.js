/* eslint-disable no-console */

const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const next = require('next');
const path = require('path');
const cors = require('cors');
const sitemap = require('nextjs-sitemap-generator');

const dev = process.env.NODE_ENV !== 'production';
const port = parseInt(process.env.PORT, 10) || 3000;
const app = next({ dev });
const handle = app.getRequestHandler();

const api = require('./api');

sitemap({
  baseUrl: 'https://learnmanabu.com',
  ignoredPaths: ['api'],
  pagesDirectory: path.join(__dirname, 'pages'),
  targetDirectory: 'public/',
  nextConfigPath: path.join(__dirname, 'next.config.js'),
  ignoredExtensions: ['png', 'jpg']
});

app.prepare().then(() => {
  const server = express();

  server.use(cookieParser());
  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({ extended: true }));
  server.use(cors());
  server.use('/', express.static('public'));

  server.get('/', async (req, res) => {
    if (req.cookies.token) {
      const actualUser = await api.user.getActualUser(req.cookies.token);
      return app.render(req, res, '/', actualUser);
    }
    return app.render(req, res, '/', req.params);
  });

  server.get('/sw.js', (req, res) => {
    res.setHeader('content-type', 'text/javascript');
    return res.sendFile(
      path.join(`${__dirname}/public/static/serviceWorker.js`)
    );
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

  server.post('/users/logout', async (req, res) => {
    const { access_token } = req.body.params;

    await api.user.logout(access_token);
    // res.send('LOGOUT');
    return app.render(req, res, '/', req.params);
  });

  server.get('/users/me', async (req, res) => {
    const { access_token } = req.query;

    const actualUser = await api.user.getActualUser(access_token);
    return res.json(actualUser);
  });

  server.get('/users/profile/:user_id', async (req, res) => {
    const { at } = req.query;
    const userData = await api.user.getUserProfile(req.params.user_id, at);

    console.log('userData', userData[0]);

    return app.render(req, res, '/users', {
      userData: userData[0]
    });
  });

  // Courses
  server.get('/course/:id', (req, res) => {
    const courseId = req.params.id;
    api.course
      .getBasicData(courseId)
      .then(data => {
        app.render(req, res, '/course', {
          courseData: data
        });
      })
      .catch(error => {
        console.error('server-error', error);
        console.log(res);
      });
  });

  server.get('/courses/create/:user_id', async (req, res) => {
    const { user_id } = req.params;
    const languages = await api.languages.getAllLanguages();
    return app.render(req, res, '/courses/create', { user_id, languages });
  });

  server.post('/course/create', async (req, res) => {
    const { access_token } = req.query;
    const { value } = req.body;

    await api.course
      .createCourse(value, access_token)
      .then(data => res.send(data.data))
      .catch(error => console.error('could not create course', error));
  });

  server.get('/course/:course_id/edit/dashboard', async (req, res) => {
    const { course_id } = req.params;
    const course_data = await api.course.getById(course_id);
    return app.render(req, res, `/course/${course_id}/edit/dashboard`, {
      course_data
    });
  });

  server.get('/course/:course_id/edit/stage', async (req, res) => {
    const { course_id } = req.params;
    return app.render(req, res, `/course/${course_id}/edit/stage`, {
      course_id
    });
  });

  server.get('/course/:course_id/edit/stage/:stage_id', async (req, res) => {
    const { access_token } = req.query;
    const { course_id, stage_id } = req.params;
    const stageData = await api.course.getStageById(course_id, stage_id);
    return app.render(req, res, `/course/${course_id}/edit/stage`, {
      course_id,
      stageData
    });
  });

  server.post('/course/:course_id/create/stage', async (req, res) => {
    const { course_id } = req.params;
    const { access_token } = req.query;
    const { value } = req.body;
    await api.course
      .createStage(course_id, value, access_token)
      .then(response => res.send(response.data))
      .catch(error => console.log('cannot create stage', error.error));
  });

  server.put('/course/:course_id/update/stage/:stage_id', async (req, res) => {
    const { course_id, stage_id } = req.params;
    const { access_token } = req.query;
    const { value } = req.body;
    await api.course
      .updateStage(course_id, stage_id, value, access_token)
      .then(response => res.send(response.data))
      .catch(error => console.log('cannot create stage', error.error));
  });

  server.delete(
    '/courses/:course_id/delete/stage/:stage_id',
    async (req, res) => {
      const { course_id, stage_id } = req.params;
      const { access_token } = req.query;
      await api.course
        .deleteStage(course_id, stage_id, access_token)
        .then(response => res.send(response.data))
        .catch(error => console.log('cannot create stage', error.error));
    }
  );

  server.get('/course/:course_id/take/:user_id', async (req, res) => {
    const { course_id, user_id } = req.params;
    await api.user
      .takeCourse(user_id, course_id)
      .then(data => {
        return res.send({ current_class: data, course_id, user_id });
      })
      .catch(error => res.send(new Error('Cannot take course')));
  });

  server.get(
    '/course/:course_id/take/stage/:current_class',
    async (req, res) => {
      const { course_id, current_class } = req.params;

      const courseData = await api.course.getById(course_id);

      await api.stages
        .getCurrentStageByCourseId(current_class, course_id)
        .then(response => {
          return app.render(req, res, `/course/${course_id}/take/stage`, {
            stageData: response,
            course_id,
            courseData
          });
        })
        .catch(error => app.render(req, res, `/`, {}));
    }
  );

  server.patch('/courses/:course_id/changeState/:state', async (req, res) => {
    const { course_id, state } = req.params;
    const { access_token } = req.query;
    console.log('change state', state);
    await api.course
      .changeState(course_id, state, access_token)
      .then(response => res.send(response.data))
      .catch(() => res.send(Error('cannot update state')));
  });

  server.get(`/course/:course_id/end`, async (req, res) => {
    const { course_id } = req.params;
    return app.render(req, res, `/course/${course_id}/finished`, req.params);
  });
  // Catalog
  server.get('/search', async (req, res) => {
    const { s } = req.query;

    const searchResults = await api.course
      .getCoursesByLanguageName(s)
      .then(response => response);

    return app.render(req, res, '/catalog', { searchResults });
  });

  // Posts
  server.get('/posts/:id', (req, res) =>
    app.render(req, res, '/posts', {
      id: req.params.id
    })
  );

  server.get('*', (req, res) => handle(req, res));

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
