import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import '../App.css';

export default class CardProduct extends Component {
  render() {
    const {
      itemConteiner,
      redirectToItemDetails,
      addToCart,
    } = this.props;
    const max = 60;
    return (
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
                  <p className="item-name">
                    {
                      `${item.title.substring(0, max)}...`
                    }

                  </p>
                  <p className="item-price">{`R$ ${item.price}`}</p>
                  <button
                    type="button"
                    onClick={ redirectToItemDetails }
                    data-testid="product-detail-link"
                  >
                    Ver mais detalhes
                  </button>
                  <button
                    type="button"
                    onClick={ () => addToCart(item) }
                    id={ item.id }
                    data-testid="product-add-to-cart"
                  >
                    Adicionar ao carrinho
                  </button>
                </div>
              </div>
            ))
            : <h1>Nenhum produto foi encontrado</h1>
        }
      </div>
    );
  }
}

CardProduct.propTypes = {
  itemConteiner: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    thumbnail: PropTypes.string,
    title: PropTypes.string,
    price: PropTypes.number,
  })).isRequired,
  redirectToItemDetails: PropTypes.func.isRequired,
  addToCart: PropTypes.func.isRequired,
};
