// middlewares/requireAuth.js
const jwt = require('jsonwebtoken');
const requireAuth = require('../../middlewares/requireAuth');
router.get('/', requireAuth, ctrl.list);

module.exports = (req, res, next) => {
  const h = req.headers.authorization || '';
  const [type, token] = h.split(' ');
  if (type !== 'Bearer' || !token) return res.status(401).json({ error: 'token requerido' });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({ error: 'token inválido o expirado' });
  }
};
