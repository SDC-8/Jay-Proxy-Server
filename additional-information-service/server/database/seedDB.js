const pg = require("pg");
const path = require("path");

const connection = "postgres://jdeguzman:@localhost:5432/housingdb";
const db = new pg.Client(connection);

// connect here
db.connect();

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
