//c
const jwt = require('jsonwebtoken');
const userSvc = require('./user.service');

function signToken(user) {
  return jwt.sign(
    { sub: user.id, email: user.email },// payload
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '1h' } 
  );
}

async function authenticate(email, password) {
  const user = await userSvc.findByEmail(email);
  if (!user) return null;
  const ok = await user.checkPassword(password);
  if (!ok) return null;
  const token = signToken(user);
  return { user: user.toJSON(), token };
}

module.exports = { authenticate, signToken };
