const request = require("supertest");
const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("../routes/user");

const sequelize = require("../config/database");

beforeAll(async () => {
  await sequelize.sync({ force: true }); // recrée les tables pour les tests
});

// Créer une app Express pour les tests
const app = express();
app.use(bodyParser.json());
app.use("/api/users", userRoutes);

describe("User API", () => {
  it("should register a new user", async () => {
    const res = await request(app)
      .post("/api/users/register")
      .send({
        name: "Afakire",
        email: "nouhailaafakire@gmail.com",
        password: "secret"
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message", "✅ Utilisateur créé");
    expect(res.body.user).toHaveProperty("email", "nouhailaafakire@gmail.com");
  });

  it("should login an existing user", async () => {
    const res = await request(app)
      .post("/api/users/login")
      .send({
        email: "nouhailaafakire@gmail.com",
        password: "secret"
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message", "✅ Connexion réussie");
    expect(res.body.user).toHaveProperty("email", "afakire@can2025.com");
  });
});
