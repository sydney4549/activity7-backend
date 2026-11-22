const fs = require("fs");
const path = require("path");
const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_SSL === "false" ? false : { rejectUnauthorized: false }
});

// Creates the table, and inserts the starting records one time only.
async function init() {
  await pool.query(fs.readFileSync(path.join(__dirname, "schema.sql"), "utf8"));
  const seeded = await pool.query("SELECT 1 FROM app_meta WHERE key = 'seeded'");
  if (seeded.rowCount === 0) {
    await pool.query(fs.readFileSync(path.join(__dirname, "seed.sql"), "utf8"));
    await pool.query("INSERT INTO app_meta (key) VALUES ('seeded')");
    console.log("Starting records inserted.");
  }
}

module.exports = pool;
module.exports.init = init;
