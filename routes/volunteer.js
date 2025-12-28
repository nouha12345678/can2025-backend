// backend/routes/volunteer.js
const express = require("express");
const router = express.Router();
const Volunteer = require("../models/Volunteer");

// Récupérer tous les volontaires
router.get("/", async (req, res) => {
  const volunteers = await Volunteer.findAll({ include: "User" });
  res.json(volunteers);
});

// Créer un volontaire
router.post("/", async (req, res) => {
  const { city, skill, userId } = req.body;
  const volunteer = await Volunteer.create({ city, skill, UserId: userId });
  res.json(volunteer);
});

module.exports = router;
