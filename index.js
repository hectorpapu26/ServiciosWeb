require('dotenv').config();
const express = require('express');
const sequelize = require('./config/database');
const routes = require('./routes');            

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());


app.use((req, _res, next) => { console.log('IN:', req.method, req.url); next(); });


app.use('/api', routes);

// 404
app.use((req, res) => res.status(404).json({ error: 'Not Found', path: req.path }));

//errores
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
});

(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log('DB ready ✅');
    app.listen(PORT, () => console.log(`API -> http://localhost:${PORT}`));
  } catch (e) {
    console.error('DB error ❌', e.message);
    process.exit(1);
  }
})();
