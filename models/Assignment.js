const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Volunteer = require("./Volunteer");
const Mission = require("./Mission");

const Assignment = sequelize.define("Assignment", {
  status: {
    type: DataTypes.ENUM("ASSIGNED", "CONFIRMED", "PRESENT"),
    defaultValue: "ASSIGNED"
  }
});

// Relations
Volunteer.hasMany(Assignment, { onDelete: "CASCADE" });
Assignment.belongsTo(Volunteer);

Mission.hasMany(Assignment, { onDelete: "CASCADE" });
Assignment.belongsTo(Mission);

module.exports = Assignment;
