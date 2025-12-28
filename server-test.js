const express = require("express");
const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("✅ Test route fonctionne !");
});

app.listen(PORT, () => {
  console.log("Server test running on port 3000");
});
