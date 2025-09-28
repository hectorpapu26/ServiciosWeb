const userSvc = require('../services/user.service');

exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body; 
    const user = await userSvc.create({ name, email, password }); 
    return res.status(201).json({ ok: true, user: { id: user.id, name, email } });
  } catch (e) { next(e); }
};

exports.login = async (req, res, next) => {
  try {
    const { email } = req.body;
    
    return res.json({ ok: true, user: { email } });
  } catch (e) { next(e); }
};
