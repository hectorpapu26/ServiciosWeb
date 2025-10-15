//c
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');
const bcrypt = require('bcryptjs');
timestamps: false


class User extends Model {
  checkPassword(plain) {

    return bcrypt.compare(plain, this.password_hash);
  }
  toJSON() {
    const v = { ...this.get() };
    delete v.password_hash;
    return v;
  }
}

User.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true, validate: { isEmail: true } },
    password_hash: { type: DataTypes.STRING, allowNull: false },
  },
  {
     sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: false,       
    freezeTableName: true,
  },
  { sequelize, modelName: 'User', tableName: 'users', timestamps: true }
);

module.exports = User;
