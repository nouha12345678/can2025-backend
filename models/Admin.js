const sequelize = require("../config/database");
const User = require("./User");

const Admin = sequelize.define("Admin", {});

// Relations
User.hasOne(Admin, { onDelete: "CASCADE" });
Admin.belongsTo(User);

module.exports = Admin;
