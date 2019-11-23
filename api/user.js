/* eslint-disable no-console */
/* eslint-disable camelcase */

const api = require('./api');

module.exports = {
  create: async userData => {
    const { username, password, email, user_type } = userData;
    try {
      const response = await api.post(`persons`, {
        username,
        password,
        email,
        user_type
      });

      const { data } = response;
      if (data === null) return 'USER_NULL';

      return 'USER_CREATED';
    } catch (error) {
      return 'CREATE_USER_ERROR';
    }
  },
  login: async (username, password) => {
    try {
      const response = await api.post(`persons/login`, {
        username,
        password
      });
      const { data } = response;
      return data;
    } catch (error) {
      console.error(`could not get`, error.Error);
      return null;
    }
  },
  logout: async access_token => {
    console.log('access_token @ api', access_token);
    await api
      .post(`persons/logout`, null, { params: { access_token } })
      .then(response => {
        console.log('logout success');
        return response.data;
      })
      .catch(error => {
        console.log('cannot logout', error.request.body);
        return `Can't logout`;
      });
  },
  getActualUser: async access_token => {
    try {
      const response = await api.get('whoami', { params: { access_token } });
      const { data } = response;
      return data;
    } catch (error) {
      return 'NO_USER';
    }
  },
  // getUserProfile: async user_id => {
  //   try {
  //     const response = await api.get(`persons/${user_id}/public_data`);
  //     const { data } = response;
  //     return data;
  //   } catch (error) {
  //     return {};
  //   }
  // },
  getUserProfile: async (user_id, access_token) => {
    try {
      const response = await api.get(`persons/${user_id}/profileData`, {
        params: { access_token }
      });
      const { data } = response;
      return data;
    } catch (error) {
      return {};
    }
  },
  getUserCurrentCourses: async user_id => {
    try {
      const response = await api.get(`persons/${user_id}/coursesThrough`);
      const { data } = response;
      return data;
    } catch (error) {
      return [];
    }
  },
  takeCourse: async (user_id, course_id) => {
    try {
      const checkIfCourseTaken = await api.get(
        `users_courses?filter={"where":{"personId":${user_id}, "courseId":${course_id}}}`
      );
      if (checkIfCourseTaken.data.length !== 0) {
        console.log('checkIfCourseTaken', checkIfCourseTaken.data);
        return checkIfCourseTaken.data[0].current_class;
      }
      console.log('paso if');
      const takeCourse = await api.post(`users_courses`, {
        personId: user_id,
        courseId: course_id,
        current_class: 1
      });
      return takeCourse.data.current_class;
    } catch (error) {
      return [];
    }
  },
  updateCourseProgress: async (user_id, course_id, current_class) => {
    try {
      const users_coursesId = await api
        .get(
          `users_courses?filter={"where":{"personId":${user_id}, "courseId":${course_id}}}`
        )
        .then(({ data }) => data[0].id);

      return await api.patch(`users_courses/${users_coursesId}`, {
        current_class
      });
    } catch (error) {
      return [];
    }
  }
};
