import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";

const recipesQuery = gql`
  query recipes($vegetarian: Boolean!) {
    recipes(vegetarian: $vegetarian) {
      id
      title
    }
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
                {data.recipes.map(({ id, title }) => (
                  <li key={id}> {title} </li>
                ))}
              </ul>
            );
          }}
        </Query>
      </>
    );
  }
}
