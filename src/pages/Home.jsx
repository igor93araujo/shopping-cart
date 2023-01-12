import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
    const products = await getProductsFromCategoryAndQuery(getId, ''); // a função de busca acontece somente por digitação assim
    this.setState({
      itemConteiner: products.results,
    });
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
                      <Link
                        to={ `/${item.id}` }
                        key={ item.id }
                        itemDetail={ item }
                        data-testid="product-detail-link"
                      >
                        <div data-testid="product" className="home-item">
                          <img
                            src={ item.thumbnail }
                            alt={ item.title }
                            data-testid="product"
                          />
                          <p className="item-name">{item.title}</p>
                          <p className="item-price">{`R$ ${item.price}`}</p>
                        </div>
                      </Link>
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
