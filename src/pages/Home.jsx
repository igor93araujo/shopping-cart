import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Categories from '../component/Categories';
import { getProductsFromCategoryAndQuery } from '../services/api';

export default class Home extends Component {
  state = {
    isInputEmpty: true,
    itemSearch: '',
    itemConteiner: [],
    /*     categoryId: '',
    query: "", */
  };

  /*   componentDidMount() {
    this.filterItems();
  } */

  /*   validateSearchParams = () => {
    const { itemSearch } = this.state;

    if (itemSearch.includes('MLB')) {
      this.setState({
        categoryId: itemSearch,
        query: "",
      }, this.filterItems);
    } else {
      this.setState({
        categoryId: "",
        query: itemSearch,
      }, this.filterItems);
    }
  }; */

  filterItems = async () => {
    // const { categoryId, query } = this.setState;
    const { itemSearch, itemConteiner } = this.state;
    const products = await getProductsFromCategoryAndQuery('', itemSearch);

    this.setState({
      itemConteiner: products.results,
    });

    console.log(itemConteiner);
  };

  handleChange = ({ target }) => (
    target.value.length > 0 ? (
      this.setState({
        isInputEmpty: false,
        itemSearch: target.value,
      }, this.validateSearchParams)
    ) : (
      this.setState({
        isInputEmpty: true,
        itemSearch: target.value,
      }, this.validateSearchParams)
    )
  );

  render() {
    const { isInputEmpty, itemConteiner } = this.state;
    return (
      <div>
        <form>
          <label htmlFor="itemSearch">
            <input
              type="text"
              name="itemSearch"
              id="itemSearch"
              onChange={ this.handleChange }
              data-testid="query-input"
            />
          </label>
        </form>
        <button
          type="button"
          onClick={ this.filterItems }
          data-testid="query-button"
        >
          Filtrar
        </button>
        <div>
          { isInputEmpty
            && (
              <p data-testid="home-initial-message">
                Digite algum termo de pesquisa ou escolha uma categoria.
              </p>
            )}
          <Link
            to="/cart"
            data-testid="shopping-cart-button"
          >
            Carrinho
          </Link>
        </div>
        <aside>
          <Categories />
        </aside>
        {
          itemConteiner.length > 0
            ? itemConteiner.map((item) => (
              <div key={ item.title } data-testid="product">
                <p>{item.title}</p>
                <img src={ item.thumbnail } alt={ item.title } />
                <p>{item.price }</p>
              </div>
            ))
            : <p>Nenhum produto foi encontrado</p>
        }
      </div>
    );
  }
}
