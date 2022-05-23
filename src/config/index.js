require('dotenv').config();

module.exports = {
  app: {
    PORT: process.env.PORT || 3000,
  },
  database: {
    url: process.env.MONGODB_URI,
    name: process.env.DATABASE,
  },
};
