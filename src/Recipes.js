import React from "react";
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";

const recipesQuery = gql`
  query recipes($vegetarian: Boolean!) {
    recipes(vegetarian: $vegetarian) {
      id
      title
    }
  }
`;

const updateRecipeStarredMutation = gql`
  mutation updateRecipeStarred($id: ID!, $isStarred: Boolean!) {
    updateRecipeStarred(id: $id, isStarred: $isStarred) @client
  }
`;

export default class Recipes extends React.Component {
  state = {
    vegetarian: true
  };
  updateVegetarian = ({ target: { checked } }) => {
    this.setState({ vegetarian: checked });
  };
  render() {
    return (
      <>
        <label>
          <input
            type="checkbox"
            checked={this.state.vegetarian}
            onChange={this.updateVegetarian}
          />
          <span>vegetarian</span>
        </label>
        <Query
          query={recipesQuery}
          variables={{ vegetarian: this.state.vegetarian }}
        >
          {({ data, loading, error }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Something went wrong</p>;
            return (
              <ul>
                {data.recipes.map(({ id, title, isStarred }) => (
                  <li key={id}>
                    {title}
                    <Mutation
                      mutation={updateRecipeStarredMutation}
                      refetchQueries={[
                        {
                          query: recipesQuery,
                          variables: { vegetarian: false }
                        },
                        {
                          query: recipesQuery,
                          variables: { vegetarian: true }
                        }
                      ]}
                      awaitRefetchQueries={true}
                    >
                      {(updateRecipeStarred, { loading, error }) => (
                        <button
                          onClick={() =>
                            updateRecipeStarred({
                              variables: { id, isStarred: !isStarred }
                            })
                          }
                          className="star-btn"
                          style={{
                            color: isStarred ? "orange" : "grey",
                            animation: loading
                              ? "inflate 0.7s ease infinite alternate"
                              : "none"
                          }}
                        >
                          x {error && "Failed to update"}
                        </button>
                      )}
                    </Mutation>
                  </li>
                ))}
              </ul>
            );
          }}
        </Query>
      </>
    );
  }
}
