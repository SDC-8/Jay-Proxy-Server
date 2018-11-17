const ExpressCassandra = require("express-cassandra");
const houseSchema = require("./models/HouseModel.js");

let models = ExpressCassandra.createClient({
  clientOptions: {
    contactPoints: ["127.0.0.1"],
    protocolOptions: { port: 9042 },
    keyspace: "housing",
    queryOptions: { consistency: ExpressCassandra.consistencies.one }
  },
  ormOptions: {
    defaultReplicationStrategy: {
      class: "SimpleStrategy",
      replication_factor: 1
    },
    migration: "safe"
  }
});

let House = models.loadSchema("House", houseSchema);

House.syncDB(function(err, result) {
  if (err) throw err;
  // result == true if any database schema was updated
  // result == false if no schema change was detected in your models
  console.log("Result: ", result);
});

// console.log(models.modelInstance.House.get_table_name());

// fields: {
//     id: "int",
//     address: "text",
//     city: "text",
//     zip: "int",
//     beds: "float",
//     baths: "float",
//     sqFt: "float",
//     status: "text",
//     taxassessment: "float"
//   },

// let query = `COPY housing.House (id,address,city,zip,beds,baths,sqFt,status,taxassessment) FROM ? WITH HEADER = FALSE`;
// let queries = [
//   { query: query, params: ["/csv/Batch-1.csv"] },
//   { query: query, params: ["/csv/Batch-2.csv"] },
//   { query: query, params: ["/csv/Batch-3.csv"] },
//   { query: query, params: ["/csv/Batch-4.csv"] },
//   { query: query, params: ["/csv/Batch-5.csv"] },
//   { query: query, params: ["/csv/Batch-6.csv"] },
//   { query: query, params: ["/csv/Batch-7.csv"] },
//   { query: query, params: ["/csv/Batch-8.csv"] },
//   { query: query, params: ["/csv/Batch-9.csv"] },
//   { query: query, params: ["/csv/Batch-10.csv"] }
// ];

// models.instance.House.execute_batch(queries, function(err) {
//   if (err) {
//     throw err;
//   }
//   console.log("Success!!!");
// });
