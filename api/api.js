const axios = require('axios');

const API_URL = 'https://learnmanabu.com/api/'; // TODO: Replace when uploaded

const api = axios.create({
  baseURL: API_URL,
  timeout: 5000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});

module.exports = api;
