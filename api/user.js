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
  }
};
