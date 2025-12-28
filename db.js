const { Pool } = require("pg");

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: 5432,
  ssl: {
    rejectUnauthorized: false   // ✅ OBLIGATOIRE pour AWS RDS
  },
  max: 5,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000
});

// Test de connexion au démarrage
(async () => {
  try {
    const client = await pool.connect();
    console.log("✅ Connected to PostgreSQL");
    client.release();
  } catch (err) {
    console.error("❌ PostgreSQL connection error:", err.message);
  }
})();

module.exports = pool;








// const { Pool } = require("pg");
// const pool = new Pool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   port: 5432,
//   ssl: {
//     rejectUnauthorized: false
//   }
// });

// // TEST DE CONNEXION (log visible)
// pool.query("SELECT 1")
//   .then(() => console.log("✅ Connected to PostgreSQL"))
//   .catch(err => console.error("❌ PostgreSQL connection error:", err.message));

// module.exports = pool;