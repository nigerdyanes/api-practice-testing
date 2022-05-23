const { app: { PORT } } = require('./config');
const createApp = require('./app');

const server = createApp();

server.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
});
