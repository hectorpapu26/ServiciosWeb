// services/user.service.js
const bcrypt = require('bcryptjs');
const User = require('../models/User');

async function findByEmail(email) {
  return User.findOne({ where: { email } });
}

async function getById(id) {
  return User.findByPk(id);
}

async function list() {
  return User.findAll();
}

async function create({ name, email, password }) {
  const password_hash = await bcrypt.hash(password, 10);
  return User.create({ name, email, password_hash });
}

async function update(id, data) {
  const user = await User.findByPk(id);
  if (!user) return null;
  if (data.password) {
    data.password_hash = await bcrypt.hash(data.password, 10);
    delete data.password;
  }
  await user.update(data);
  return user;
}

async function remove(id) {
  const user = await User.findByPk(id);
  if (!user) return false;
  await user.destroy();
  return true;
}

module.exports = { findByEmail, getById, list, create, update, remove };
