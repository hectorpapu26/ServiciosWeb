const router = require('express').Router();

router.get('/health', (_req, res) => res.json({ ok: true }));

router.use('/auth',  require('./api/auth'));   
router.use('/users', require('./user'));       

module.exports = router;
