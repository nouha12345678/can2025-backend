const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Mission = sequelize.define("Mission", {
  stadium: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false
  }
});

module.exports = Mission;
