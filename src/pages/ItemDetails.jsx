import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { TiArrowBack } from 'react-icons/ti';
import Header from '../components/Header';
import { getProductById } from '../services/api';
import '../App.css';

export default class ItemDetails extends Component {
  state = {
    itemConteiner: [],
    isFreeShipping: false,
  };

  componentDidMount() {
    this.getProductDetails();
  }

  getProductDetails = async () => {
    const { match: { params: { id } } } = this.props;

    const product = await getProductById(id);
    this.setState({
      itemConteiner: product,
    }, this.verifyShippingStyle);
  };

  verifyShippingStyle = () => {
    const { itemConteiner } = this.state;

    const freeShipping = itemConteiner.shipping.free_shipping;

    if (freeShipping) {
      this.setState({ isFreeShipping: true });
    }
  };

  render() {
    const { itemConteiner, isFreeShipping } = this.state;
    return (
      <div>
        <Header />
        <div className="cart-item">
          <div className="item-img-name">
            <Link
              to="/"
            >
              <TiArrowBack className="cart-back" />
            </Link>
            <div className="img-name">
              <p data-testid="product-detail-name">{ itemConteiner.title }</p>
              <img
                src={ itemConteiner.thumbnail }
                alt={ itemConteiner.id }
                data-testid="product-detail-image"
              />
            </div>
          </div>
          <div className="item-details">
            <h2>Mais informações</h2>
            {isFreeShipping ? <p>Frete: Grátis</p> : <p>Frete: Calcule o frete</p>}
            <p>{`Quantidade disponível: ${itemConteiner.available_quantity}`}</p>
            <div className="item-price-btn">
              <p
                data-testid="product-detail-price"
              >
                {`Valor: R$ ${itemConteiner.price}`}
              </p>
              <Link
                to="/cart"
                data-testid="shopping-cart-button"
                className="addToCartBtn"
              >
                Adicionar ao carrinho
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ItemDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
