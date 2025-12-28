const express = require("express");
const cors = require("cors");
const sequelize = require("./config/database");
require("dotenv").config();

// Import des modèles
require("./models/User");
require("./models/Volunteer");
require("./models/Admin");
require("./models/Mission");
require("./models/Assignment");

// 🔴 Import des routes
const userRoutes = require("./routes/user");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Route test
app.get("/", (req, res) => {
  res.send("Backend CAN2025 running 🚀");
});

// Route DB test
app.get("/db-test", async (req, res) => {
  try {
    const [result] = await sequelize.query("SELECT NOW()");
    res.json({ db_time: result[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Brancher les routes utilisateur
app.use("/api/users", userRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

// Connexion DB
(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Sequelize connected to AWS RDS");
    await sequelize.sync();
    console.log("✅ Tables created/synchronized in AWS");
  } catch (err) {
    console.error("❌ ORM error:", err);
  }
})();
