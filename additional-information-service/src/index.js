import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";
import { PreQuery } from "./components/PreQuery.js";

// Once up on Docker inside EC2, have to go to fully qualified url for container
const client = new ApolloClient({
  uri: `http://additional-information-load-557dd12d427e74f4.elb.us-east-1.amazonaws.com/graphql`
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <PreQuery />
  </ApolloProvider>,
  document.getElementById("main")
);
