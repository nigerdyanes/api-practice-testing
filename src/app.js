const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const routeApi = require('./router/v1');

const createApp = () => {
  const app = express();
  app.use(express.json());
  app.use(cors());
  app.use(helmet());

  app.get('/', (req, res) => {
    res.status(200).send('Hello world');
  });

  routeApi(app);

  return app;
};

module.exports = createApp;
