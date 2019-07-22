import React, { Component } from "react";
import ApolloClient from "apollo-boost";
import gql from "graphql-tag";
import { ApolloProvider, ApolloConsumer } from "react-apollo";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div>
          <h1>hello world!!</h1>
          <ApolloConsumer>
            {client => {
              client
                .query({
                  query: gql`
                    {
                      recipes {
                        id
                        title
                      }
                    }
                  `
                })
                .then(result => console.log(result));
              return null;
            }}
          </ApolloConsumer>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
