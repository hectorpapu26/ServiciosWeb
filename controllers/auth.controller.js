const userSvc = require('../services/user.service');
const authSvc = require('../services/auth');

exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body || {};
    const exists = await userSvc.findByEmail(email);
    if (exists) return res.status(400).json({ error: 'email ya está en uso' });

    const user = await userSvc.create({ name, email, password });
    const token = authSvc.signToken(user);
    return res.status(201).json({ ok: true, user: user.toJSON(), token });
  } catch (e) { next(e); }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) return res.status(400).json({ error: 'email y password son obligatorios' });

    const auth = await authSvc.authenticate(email, password);
    if (!auth) return res.status(401).json({ error: 'credenciales inválidas' });

    return res.json({ ok: true, ...auth }); //corroborar que er servicio este en orden
  } catch (e) { next(e); }
};
