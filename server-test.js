const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/user"); // chemin vers ton fichier user.js

const app = express();
app.use(bodyParser.json());

// Route de test
app.get("/", (req, res) => {
  res.send("✅ Test route fonctionne !");
});

// Routes utilisateur
app.use("/api/users", userRoutes);

app.listen(3002, () => {
  console.log("Server test running on port 3002");
});
