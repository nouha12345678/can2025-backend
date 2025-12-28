const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

// Inscription
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashedPassword });

  // 🔔 NOTIFICATION FaaS (email de bienvenue)
  try {
    await fetch("https://can-notify-welcome-39985935336.europe-west1.run.app", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email })
    });
  } catch (err) {
    console.error("❌ Erreur notification:", err.message);
    // on n'interrompt PAS la création du compte
  }

  res.json({ message: "✅ Utilisateur créé", user });
});

// Connexion
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });

  if (!user) return res.status(401).json({ message: "❌ Email introuvable" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ message: "❌ Mot de passe incorrect" });

  res.json({
    message: "✅ Connexion réussie",
    user: { id: user.id, email: user.email, role: user.role }
  });
});

module.exports = router;