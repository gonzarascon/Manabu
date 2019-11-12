const api = require('./api');

module.exports = {
  getCurrentStageByCourseId: async (stageNumber, courseId) => {
    try {
      const response = await api.get(
        `stages?filter={"where":{"number":${stageNumber}, "courseId":${courseId}}}`
      );
      const { data } = response;
      return data;
    } catch (error) {
      console.error(`could not get`, error);
      return [];
    }
  }
};
