const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");

const Volunteer = sequelize.define("Volunteer", {
  city: {
    type: DataTypes.STRING,
    allowNull: false
  },
  skill: {
    type: DataTypes.STRING,
    allowNull: false
  },
  available: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
});

// Relations
User.hasOne(Volunteer, { onDelete: "CASCADE" });
Volunteer.belongsTo(User);

module.exports = Volunteer;
