//const users = [];

async function list() { return users; }
async function getById(id) { return users.find(u => String(u.id) === String(id)) || null; }
async function create(data) { const id = users.length ? users[users.length-1].id + 1 : 1; const u = { id, ...data }; users.push(u); return u; }
async function update(id, data) { const i = users.findIndex(u => String(u.id) === String(id)); if (i<0) return null; users[i] = { ...users[i], ...data }; return users[i]; }
async function remove(id) { const i = users.findIndex(u => String(u.id) === String(id)); if (i<0) return false; users.splice(i,1); return true; }

const User = require('../models/User'); 

async function findByEmail(email) {
  return User.findOne({ where: { email } });
}

async function create(data) {
 
  return User.create(data);
}

module.exports = { findByEmail, create /*, list, getById, update, remove, ...*/ };


module.exports = { list, getById, create, update, remove };
