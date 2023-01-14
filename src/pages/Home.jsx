import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import Categories from '../components/Categories';
import { getProductsFromCategoryAndQuery } from '../services/api';
import '../App.css';
import Header from '../components/Header';
import CardProduct from '../components/CardProduct';
// import { getItem, setItem } from '../services/LocalStorage';
// import { setItem } from '../services/LocalStorage';

export default class Home extends Component {
  state = {
    isInputEmpty: true,
    itemConteiner: [],
    itemSearch: '',
  };

  filterItems = async () => {
    const { itemSearch } = this.state;
    this.setState({
      itemConteiner: [],
    });
    const products = await getProductsFromCategoryAndQuery('', itemSearch); // a função de busca acontece somente por digitação assim

    this.setState({
      itemConteiner: products.results,
    });
  };

  handleChange = ({ target }) => (
    target.value.length > 0 ? (
      this.setState({
        itemSearch: target.value,
        isInputEmpty: false,
      })
    ) : (
      this.setState({
        itemSearch: target.value,
        isInputEmpty: true,
      })
    )
  );

  categoriesItems = async ({ target }) => {
    const getId = target.id;

    this.setState({
      itemConteiner: [],
    });
    const products = await getProductsFromCategoryAndQuery(getId, '');

    this.setState({
      itemConteiner: products.results,
    });
  };

  redirectToItemDetails = ({ target }) => {
    const getItemId = target.parentNode.firstChild.innerHTML;

    const { history } = this.props;
    return history.push(`/${getItemId}`);
  };

  addToCart = (param) => {
    if (localStorage.length === 0) {
      localStorage.setItem('cartItens', JSON.stringify([param]));
    } else {
      const myPrevCart = JSON.parse(localStorage.getItem('cartItens'));
      const myCart = [...myPrevCart, param];
      localStorage.setItem('cartItens', JSON.stringify(myCart));
    }
  };

  render() {
    const { isInputEmpty, itemConteiner, itemSearch } = this.state;
    return (
      <div className="home">
        <div>
          <Header // chamando as props do header
            itemSearch={ itemSearch }
            handleChange={ this.handleChange }
            filterItems={ this.filterItems }
          />
          <div className="home-search">
            <aside>
              <Categories
                categoriesItems={ this.categoriesItems }
              />
            </aside>
            <div className="home-results">
              { isInputEmpty
            && (
              <p data-testid="home-initial-message">
                Digite algum termo de pesquisa ou escolha uma categoria.
              </p>
            )}
              <CardProduct
                itemConteiner={ itemConteiner }
                redirectToItemDetails={ this.redirectToItemDetails }
                addToCart={ this.addToCart }
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
