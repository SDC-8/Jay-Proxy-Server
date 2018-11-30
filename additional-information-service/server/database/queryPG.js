const { Pool } = require("pg");

const pool = new Pool({
  host: process.env.HOUSING_DB,
  port: process.env.DB_PORT,
  database: "housingdb",
  user: process.env.DB_USER,
  password: "password",
  max: 20
});

module.exports = {
  create: () => {
    console.log("Create");
  },
  read: async (...houseIds) => {
    const { rows } = await pool.query(
      `SELECT * FROM housing WHERE id in (${houseIds})`
    );
    console.log(rows);
    return rows;
  },
  update: () => {
    console.log("Update");
  },
  delete: () => {
    console.log("Delete");
  }
};
