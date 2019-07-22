import React, { Component } from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import Recipes from "./Recipes";
import AddRecipe from "./AddRecipe";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <AddRecipe />
      </ApolloProvider>
    );
  }
}

export default App;
