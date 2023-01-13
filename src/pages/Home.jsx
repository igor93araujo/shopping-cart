import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import Categories from '../components/Categories';
import { getProductsFromCategoryAndQuery } from '../services/api';
import '../App.css';
import Header from '../components/Header';

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
              <div className="home-items-results">
                {
                  itemConteiner.length > 0
                    ? itemConteiner.map((item) => (
                      <div key={ item.id } data-testid="product">
                        <div className="home-item">
                          <p className="itemId">{item.id}</p>
                          <img
                            src={ item.thumbnail }
                            alt={ item.title }
                          />
                          <p className="item-name">{item.title}</p>
                          <p className="item-price">{`R$ ${item.price}`}</p>
                          <button
                            type="button"
                            onClick={ this.redirectToItemDetails }
                            data-testid="product-detail-link"
                          >
                            Ver mais detalhes
                          </button>
                        </div>
                      </div>
                    ))
                    : <h1>Nenhum produto foi encontrado</h1>
                }
              </div>
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
