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

    this.setState({
      itemConteiner: [],
    });

    const product = await getProductById(id);

    console.log(product);
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

  addToCart = (param) => {
    if (localStorage.length === 0) {
      localStorage.setItem('cartItens', JSON.stringify([param]));
    } else {
      const myPrevCart = JSON.parse(localStorage.getItem('cartItens'));
      console.log(myPrevCart);
      const myCart = [...myPrevCart, param];
      localStorage.setItem('cartItens', JSON.stringify(myCart));
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
              <button
                data-testid="product-detail-add-to-cart"
                type="button"
                onClick={ () => this.addToCart(itemConteiner) }
                id={ itemConteiner.id }

              >
                Adicionar ao carrinho
              </button>
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
