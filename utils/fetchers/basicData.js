const api = require('../../api');

const getBasicData = async () => {
    let response;
    await api.
        main.
        getBasicData().
        then(async data => response = await data)
        .catch(error => response = error.message);

    return response;
};

export default { getBasicData };