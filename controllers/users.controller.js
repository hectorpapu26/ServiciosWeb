const svc = require('../services/user.service'); 

exports.list = async (_req, res, next) => {
  try { res.json(await svc.list()); } catch (e) { next(e); }
};

exports.get = async (req, res, next) => {
  try {
    const it = await svc.getById(req.params.id);
    if (!it) return res.status(404).json({ error: 'User not found' });
    res.json(it);
  } catch (e) { next(e); }
};

exports.create = async (req, res, next) => {
  try { res.status(201).json(await svc.create(req.body)); } catch (e) { next(e); }
};

exports.update = async (req, res, next) => {
  try {
    const it = await svc.update(req.params.id, req.body);
    if (!it) return res.status(404).json({ error: 'User not found' });
    res.json(it);
  } catch (e) { next(e); }
};

exports.remove = async (req, res, next) => {
  try {
    const ok = await svc.remove(req.params.id);
    if (!ok) return res.status(404).json({ error: 'User not found' });
    res.status(204).end();
  } catch (e) { next(e); }
};
