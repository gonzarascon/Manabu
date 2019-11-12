const api = require('./api');

module.exports = {
  getBasicData: async () => {
    try {
      const response = await api.get(`courses/basicData`);
      const { data } = response;
      return data;
    } catch (error) {
      console.error(`could not get`, error);
      return [];
    }
  }
};
