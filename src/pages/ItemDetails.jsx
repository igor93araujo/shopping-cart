import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { TiArrowBack } from 'react-icons/ti';
import Header from '../components/Header';
import { getProductById } from '../services/api';

export default class ItemDetails extends Component {
  state = {
    itemConteiner: [],
  };

  componentDidMount() {
    this.getProductDetails();
  }

  getProductDetails = async () => {
    const { match: { params: { id } } } = this.props;

    const product = await getProductById(id);
    this.setState({
      itemConteiner: product,
    });
  };

  render() {
    const { itemConteiner } = this.state;
    return (
      <div>
        <Header />
        <section>
          <Link
            to="/"
          >
            <TiArrowBack className="cart-back-icon" />
          </Link>
          <div>
            <p data-testid="product-detail-name">{ itemConteiner.title }</p>
            <img
              src={ itemConteiner.thumbnail }
              alt={ itemConteiner.id }
              data-testid="product-detail-image"
            />
            <p data-testid="product-detail-price">{ itemConteiner.price }</p>
            <p>{`Quantidade disponível: ${itemConteiner.available_quantity}`}</p>
            <Link
              to="/cart"
              data-testid="shopping-cart-button"
            >
              Adicionar ao carrinho
            </Link>
          </div>
        </section>
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
