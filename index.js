require('dotenv').config();
const express = require('express');
const sequelize = require('./config/database');

const app = express();
const PORT = process.env.PORT || 3000;

//logs
const morgan = require('morgan');
const logger = require('./config/logger');

//morgan escriba con Pino
const morganToPino = {
  write: (msg) => logger.info(msg.trim())
};

app.use(express.json());
app.use(morgan('combined', { stream: morganToPino })); // logs de HTTP

//rutas
app.use('/api', require('./routes'));

// 404 y errores
app.use((req, res) => res.status(404).json({ error: 'Not Found', path: req.originalUrl }));
app.use((err, _req, res, _next) => {
  logger.error(err, 'Unhandled error'); //pino para errores
  res.status(500).json({ error: 'Internal Server Error' });
});

// DB y arranque
(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    logger.info('DB ready');
    app.listen(PORT, () => logger.info(`API -> http://localhost:${PORT}`));
  } catch (e) {
    logger.fatal(e, 'DB error');
    process.exit(1);
  }
})();
