import React, { Component } from 'react';

export default class Search extends Component {
  state = {
    isInputEmpty: true,
  };

  handleChange = ({ target }) => (
    target.value.length > 0 ? (
      this.setState({
        isInputEmpty: false,
      })
    ) : (
      this.setState({
        isInputEmpty: true,
      })
    )
  );

  render() {
    const { isInputEmpty } = this.state;
    return (
      <div>
        <form>
          <label htmlFor="itemSearch">
            <input
              type="text"
              name="itemSearch"
              id="itemSearch"
              onChange={ this.handleChange }
            />
          </label>
        </form>
        <div>
          { isInputEmpty
            && (
              <p data-testid="home-initial-message">
                Digite algum termo de pesquisa ou escolha uma categoria.
              </p>
            )}
        </div>
      </div>
    );
  }
}
