import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { TiArrowBack } from 'react-icons/ti';
import Header from '../components/Header';
import { getItem } from '../services/LocalStorage';

export default class Cart extends Component {
  state = {
    countItens: 0,
    isSubtractBTNdisabled: true,
  };

  componentDidMount() {
    this.checkLocalStorageItem();
  }

  subUnit = ({ target }) => {
    const quantity = +target.nextSibling.innerHTML;
    console.log(quantity);

    if (quantity === 2) {
      this.setState({
        isSubtractBTNdisabled: true,
      });
    }
    target.nextSibling.innerHTML = quantity - 1;
  };

  addUnit = ({ target }) => {
    const quantity = +target.previousSibling.innerHTML;

    if (quantity === 1) {
      this.setState({
        isSubtractBTNdisabled: true,
      });
    }
    this.setState({
      isSubtractBTNdisabled: false,
    });

    target.previousSibling.innerHTML = quantity + 1;
  };

  checkLocalStorageItem() {
    const myCart = getItem('cartItens');
    if (myCart === null) {
      this.setState({
        countItens: 0,
      });
    } else {
      this.setState({
        countItens: myCart.length || 0,
      });
    }
  }

  render() {
    const { countItens } = this.state;
    const myCart = getItem('cartItens');
    const { isSubtractBTNdisabled } = this.state;
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
              localStorage.length === 0 ? (
                <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
              )
                : myCart.map((item) => (
                  <div key={ item.id }>
                    <span data-testid="shopping-cart-product-name">{item.title}</span>
                    <img src={ item.thumbnail } alt={ item.title } />
                    <button
                      type="button"
                      onClick={ this.subUnit }
                      disabled={ isSubtractBTNdisabled }
                    >
                      -
                    </button>
                    <p>1</p>
                    <button
                      type="button"
                      onClick={ this.addUnit }
                    >
                      +
                    </button>
                  </div>
                ))

            }
            <p data-testid="shopping-cart-product-quantity">{countItens}</p>
          </div>
        </section>
      </div>
    );
  }
}
