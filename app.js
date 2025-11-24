// app.js (BACKEND)

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');

// Middleware propios
const responseMiddleware = require('./middlewares/response');
const requestLogger = require('./middlewares/requestLogger');
const apiLimiter = require('./middlewares/rateLimit');

// Archivo de rutas que TÚ ya tienes
const routes = require('./routes');

// Swagger
const swaggerSpec = require('./config/swagger');
const swaggerUi = require('swagger-ui-express');

const app = express();

// ====== MIDDLEWARES GLOBALES ======
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(responseMiddleware);
app.use(requestLogger);
app.use(apiLimiter);

// ====== SWAGGER ======
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ====== SERVIR TU FRONT (Views) ======
app.use(express.static(path.join(__dirname, 'Views')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'Views', 'index.html'));
});

// ====== RUTAS DE API (Auth, Users, Health, etc) ======
app.use(routes);

// ====== 404 ======
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    path: req.path,
  });
});

module.exports = app;
