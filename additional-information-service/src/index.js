import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";
import { PreQuery } from "./components/PreQuery.js";

// Once up on Docker inside EC2, have to go to fully qualified url for container
const client = new ApolloClient({
  uri: `http://localhost:3003/graphql`
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <PreQuery />
  </ApolloProvider>,
  document.getElementById("main")
);
