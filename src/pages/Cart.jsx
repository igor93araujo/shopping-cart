import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { TiArrowBack } from 'react-icons/ti';
import Header from '../components/Header';

export default class Cart extends Component {
  state = {
    cart: [],
  };

  render() {
    const { cart } = this.state;
    return (
      <div>
        <Header />
        <section className="cart-content">
          <Link
            to="/"
          >
            <TiArrowBack className="cart-back-icon" />
          </Link>
          <div className="cart-message">
            {
              cart.length === 0 && (
                <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
              )
            }
          </div>
        </section>
      </div>
    );
  }
}
