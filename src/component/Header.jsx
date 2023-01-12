import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';

export default class Header extends Component {
  render() {
    const { itemSearch, handleChange, filterItems } = this.props;

    return (
      <div className="searching-elements">
        <label htmlFor="itemSearch">
          <input
            type="text"
            name="itemSearch"
            id="itemSearch"
            onChange={ handleChange }
            data-testid="query-input"
            placeholder="Faça sua busca aqui 🔎"
            value={ itemSearch }
          />
        </label>
        <button
          type="button"
          onClick={ filterItems }
          data-testid="query-button"
        >
          Buscar
        </button>
        <Link
          to="/cart"
          data-testid="shopping-cart-button"
        >
          Carrinho
        </Link>
      </div>
    );
  }
}

Header.propTypes = {
  itemSearch: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  filterItems: PropTypes.func.isRequired,
};
