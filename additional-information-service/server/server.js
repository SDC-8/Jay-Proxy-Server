require("newrelic");
const cors = require("cors");
const express = require("express");
const graphqlHTTP = require("express-graphql");
const path = require("path");
const schema = require("./schema.js");

// const port = 3003;
// const port = process.argv[2] || 8080;

const app = express();

app.use(cors());

// app.get("*.js", function(req, res, next) {
//   // req.url = req.url + ".gz";
//   // console.log(req.url);
//   // res.set("Content-Encoding", "gzip");
//   res.set("Content-Type", "application/javascript");
//   next();
// });

app.use(express.static(__dirname + "public"));

app.get("/bundle.js", (req, res) => {
  // console.log(req.url);
  res.set("Content-Encoding", "gzip");
  res.set("Content-Encoding", "gzip");
  res.sendFile(path.join(`${__dirname}/public/bundle.js.gz`));
});

app.get("/1.bundle.js", (req, res) => {
  // console.log(req.url);
  res.set("Content-Encoding", "gzip");
  res.set("Content-Encoding", "gzip");
  res.sendFile(path.join(`${__dirname}/public/1.bundle.js.gz`));
});

app.get("/2.bundle.js", (req, res) => {
  // console.log(req.url);
  res.set("Content-Encoding", "gzip");
  res.set("Content-Encoding", "gzip");
  res.sendFile(path.join(`${__dirname}/public/2.bundle.js.gz`));
});

app.get("/*", (req, res) => {
  res.sendFile(path.join(`${__dirname}/public/index.html`));
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

// Take out x-powered-by
app.disable("x-powered-by");

module.exports = app;
