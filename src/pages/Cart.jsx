import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { TiArrowBack } from 'react-icons/ti';
import Header from '../components/Header';
import { getItem } from '../services/LocalStorage';
import '../App.css';

export default class Cart extends Component {
  state = {
    countItens: 0,
    isSubtractBTNdisabled: false,
    loading: false,
  };

  componentDidMount() {
    this.checkLocalStorageItem();
  }

  deleteProduct = (param) => {
    const { countItens } = this.state;
    this.setState({
      loading: true,
    });
    const myCart = JSON.parse(localStorage.getItem('cartItens'));
    const myNewCart = myCart.filter((e) => e.id !== param.id);
    const removeQnt = JSON.parse(localStorage.getItem(`qnt-${param.id}`));
    localStorage.removeItem(`qnt-${param.id}`);
    localStorage.setItem('cartItens', JSON.stringify(myNewCart));
    this.setState({
      loading: false,
      countItens: countItens - removeQnt,
    });
  };

  removeFromCart = (param) => {
    const { countItens } = this.state;
    this.setState({
      loading: true,
    });

    let soma = JSON.parse(localStorage.getItem(`qnt-${param.id}`));
    if (soma > 1) {
      soma -= 1;
      localStorage.setItem(`qnt-${param.id}`, JSON.stringify(soma));
      this.setState({
        countItens: countItens - 1,
      });
    }
    this.setState({
      loading: false,
    }, () => {});
  };

  addToCart = (param) => {
    const { countItens } = this.state;
    this.setState({
      countItens: countItens + 1,
      loading: true,
    });

    let soma = JSON.parse(localStorage.getItem(`qnt-${param.id}`));
    soma += 1;
    localStorage.setItem(`qnt-${param.id}`, JSON.stringify(soma));

    this.setState({
      loading: false,
    }, () => {});
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
    const { countItens, loading } = this.state;
    let myCart = getItem('cartItens');
    if (myCart === null) {
      myCart = [];
    }
    const total = myCart.reduce((acc, curr) => {
      const qnt = JSON.parse(localStorage.getItem(`qnt-${curr.id}`));
      acc += qnt * curr.price;
      return acc;
    }, 0);

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
              countItens === 0 ? (
                <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
              )
                : myCart.map((item) => (
                  <div
                    key={ item.id }
                    id={ item.id }
                    className="cart-item"
                  >
                    <span data-testid="shopping-cart-product-name">{item.title}</span>
                    <img src={ item.thumbnail } alt={ item.title } />

                    <div className="cart-item-price">
                      <button
                        data-testid="product-decrease-quantity"
                        type="button"
                        onClick={ () => this.removeFromCart(item) }
                        disabled={ isSubtractBTNdisabled }
                      >
                        -
                      </button>
                      <p
                        data-testid="shopping-cart-product-quantity"
                        id={ `${item.id}-qnt` }
                      >
                        { JSON.parse(localStorage.getItem(`qnt-${item.id}`)) }
                      </p>
                      <button
                        data-testid="product-increase-quantity"
                        type="button"
                        onClick={ () => this.addToCart(item) }
                      >
                        +
                      </button>
                    </div>

                    <p className="item-price">
                      {
                        loading ? <p>Loading</p>
                          : (
                            `R$ ${(item.price * JSON
                              .parse(localStorage
                                .getItem(`qnt-${item.id}`)))
                              .toFixed(2).replace('.', ',')}`
                          )
                      }
                    </p>
                    <button
                      data-testid="remove-product"
                      type="button"
                      onClick={ () => this.deleteProduct(item) }
                    >
                      Excluir produto
                    </button>
                  </div>
                ))
            }
          </div>
          <div className="cart-total">
            <p
              data-testid="shopping-cart-size"
            >
              {`Total de ítens no carrinho: ${countItens}`}
            </p>
            <p>{ `Total da compra: R$ ${(total.toFixed(2).replace('.', ','))}` }</p>
          </div>
          <div className="cart-btn">
            <Link
              to="/buy"
              data-testid="checkout-products"
              className="cart-buy-btn"
            >
              Finalize a compra
            </Link>
          </div>
        </section>
      </div>
    );
  }
}
