const userSvc = require('../services/user.service');
const authSvc = require('../services/auth');
const logger = require('../config/logger');


exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const exists = await userSvc.findByEmail(email);
    if (exists) {
      logger.warn({ email }, 'Intento de registro con email existente');
      return res.status(400).json({
        errors: [{ field: 'email', msg: 'email ya registrado' }],
      });
    }

    const user = await userSvc.create({ name, email, password });
    logger.info({ userId: user.id, email }, 'Usuario registrado');

    // nunca regreses el hash (tu modelo ya lo oculta en toJSON)
    res.status(201).json({ ok: true, user });
  } catch (e) {
    logger.error(e, 'Fallo en register');
    next(e);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await userSvc.authenticate(email, password); // <- usa userSvc
    if (!user) {
      logger.warn({ email }, 'Login inválido');
      return res.status(401).json({ error: 'credenciales inválidas' });
    }

    logger.info({ userId: user.id, email }, 'Login OK');
    // si luego agregas JWT, emítelo aquí
    res.json({ ok: true, user });
  } catch (e) {
    logger.error(e, 'Fallo en login');
    next(e);
  }
};
