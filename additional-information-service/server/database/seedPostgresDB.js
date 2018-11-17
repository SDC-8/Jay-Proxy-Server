const pg = require("pg");

const connection = "postgres://jdeguzman:@localhost:5432/housingdb";
const db = new pg.Client(connection);

// connect here
db.connect();

// const makeTable = `CREATE TABLE IF NOT EXISTS housing (
//   id integer,
//   address varchar(50),
//   city varchar(30),
//   zip integer,
//   beds decimal,
//   baths decimal,
//   sqft decimal,
//   status varchar(11),
//   taxassessment decimal)`;

// db.query(makeTable)
//   .then(res => {
//     console.log(res);
//     db.end();
//   })
//   .catch(err => {
//     console.log(err);
//     db.end();
//   });

const dbMakeFat = `COPY housing FROM '/Users/jdeguzman/Documents/Hack_Reactor/SDC/Jay-Proxy-Server/additional-information-service/server/database/test-3.csv' WITH (FORMAT CSV);`;

db.query(dbMakeFat)
  .then(res => {
    console.log(res);
    db.end();
  })
  .catch(err => {
    console.log(err);
    db.end();
  });

module.exports = db;
