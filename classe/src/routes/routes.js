const express = require('express');
const { sign } = require('../controllers/signNewsletter');
const { send } = require('../controllers/sendNewsletter');

const routes = express();

routes.post('/sign', sign);
routes.post('/send', send);

module.exports = routes;