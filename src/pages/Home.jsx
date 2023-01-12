import React, { Component } from 'react';
import Categories from '../component/Categories';
import { getProductsFromCategoryAndQuery } from '../services/api';
import '../App.css';
import Header from '../component/Header';

export default class Home extends Component {
  state = {
    isInputEmpty: true,
    itemConteiner: [],
    itemSearch: '',
  };

  filterItems = async () => {
    const { itemSearch } = this.state;
    const products = await getProductsFromCategoryAndQuery('', itemSearch);

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

  render() {
    const { isInputEmpty, itemConteiner, itemSearch } = this.state;
    return (
      <div className="home">
        <div>
          <Header
            itemSearch={ itemSearch }
            handleChange={ this.handleChange }
            filterItems={ this.filterItems }
          />
          <div className="home-search">
            <aside>
              <Categories />
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
                      <div key={ item.title } data-testid="product" className="home-item">
                        <img src={ item.thumbnail } alt={ item.title } />
                        <p className="item-name">{item.title}</p>
                        <p className="item-price">{`R$ ${item.price}`}</p>
                      </div>
                    ))
                    : <p>Nenhum produto foi encontrado</p>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
