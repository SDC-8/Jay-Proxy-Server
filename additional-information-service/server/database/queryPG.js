const { Pool } = require("pg");

const pool = new Pool({
  connectionString: "postgres://jdeguzman:@localhost:5432/housingdb",
  max: 20
});

// const connection = "postgres://jdeguzman:@localhost:5432/housingdb";
// const db = new pg.Client(connection);

// // connect here
// db.connect();

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
