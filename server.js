require("dotenv").config();
const express = require("express");
const cors = require("cors");
const sequelize = require("./config/database");

// Import des modèles
require("./models/User");
require("./models/Volunteer");
require("./models/Admin");
require("./models/Mission");
require("./models/Assignment");

const app = express();
const PORT = process.env.PORT || 4000; // Utiliser 4000 au lieu de 3000


app.use(cors());
app.use(express.json());

// Route test
app.get("/", (req, res) => {
  res.send("Backend CAN2025 running 🚀");
});
// 🔴 TEST DB
app.get("/db-test", async (req, res) => {
  try {
    const [result] = await sequelize.query("SELECT NOW()");
    res.json({ db_time: result[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ⚡ Lancer le serveur tout de suite
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

// Connexion à la DB en arrière-plan
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
