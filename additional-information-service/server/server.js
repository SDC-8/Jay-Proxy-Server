const cors = require("cors");
const express = require("express");
const graphqlHTTP = require("express-graphql");
const path = require("path");
const schema = require("./schema.js");

// const port = 3003;
// // const port = process.argv[2] || 8080;

const app = express();

app.use(cors());

app.get("*.js", function(req, res, next) {
  req.url = req.url + ".gz";
  res.set("Content-Encoding", "gzip");
  next();
});

app.use(express.static(`${__dirname}/../public`));

app.get("/:urlId", (req, res) => {
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

// app.listen(
//   port,
//   /*"192.168.7.194",*/ () =>
//     console.log(
//       `Express GraphQL Server Now Running On localhost:${port}/graphql`
//     )
// );

module.exports = app;
