const api = require('./api');

module.exports = {
  getAllLanguages: async () => {
    try {
      const response = await api.get(`languages`);
      const { data } = response;
      return data;
    } catch (error) {
      console.error(`could not get`, error);
      return null;
    }
  }
};
