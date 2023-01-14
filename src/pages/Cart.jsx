import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { TiArrowBack } from 'react-icons/ti';
import Header from '../components/Header';
import { getItem } from '../services/LocalStorage';

export default class Cart extends Component {
  state = {
    countItens: 0,
    isSubtractBTNdisabled: false,
    loading: false,
  };

  componentDidMount() {
    this.checkLocalStorageItem();
  }

  removeFromCart = (param) => {
    const { countItens } = this.state;
    this.setState({
      countItens: countItens - 1,
      loading: true,
    });
    const myCart = JSON.parse(localStorage.getItem('cartItens'));
    const classIdToDecrease = myCart.filter((element) => element.id === param.id);
    classIdToDecrease.pop();
    const myCartWithoutTarget = myCart.filter((element) => element.id !== param.id);
    const myNewCart = [...myCartWithoutTarget, ...classIdToDecrease];
    localStorage.setItem('cartItens', JSON.stringify(myNewCart));
    this.setState({
      loading: false,
    });
  };

  addToCart = (param) => {
    const { countItens } = this.state;
    this.setState({
      countItens: countItens + 1,
      loading: true,
    });
    if (localStorage.length === 0) {
      localStorage.setItem('cartItens', JSON.stringify([param]));
    } else {
      const myPrevCart = JSON.parse(localStorage.getItem('cartItens'));
      const myCart = [...myPrevCart, param];
      localStorage.setItem('cartItens', JSON.stringify(myCart));
    }
    this.setState({
      loading: false,
    });
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
    let myCart = [];
    myCart = getItem('cartItens');
    const myCartItensRender = myCart.reduce((acc, curr) => {
      const haveThisID = acc.some((element) => element.id === curr.id);
      if (!haveThisID) {
        acc = [...acc, curr];
      }
      return acc;
    }, []);
    const total = myCartItensRender.reduce((acc, curr) => {
      acc += myCart.filter((e) => e.id === curr.id).length * curr.price;
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
                : myCartItensRender.map((item) => (
                  <div
                    key={ item.id }
                    id={ item.id }
                  >
                    <span data-testid="shopping-cart-product-name">{item.title}</span>
                    <img src={ item.thumbnail } alt={ item.title } />
                    <button
                      type="button"
                      onClick={ () => this.removeFromCart(item) }
                      disabled={ isSubtractBTNdisabled }
                    >
                      -
                    </button>
                    <p
                      id={ `${item.id}-qnt` }
                    >
                      { JSON.parse(localStorage.getItem('cartItens'))
                        .filter((element) => element.id === item.id).length }
                    </p>
                    <button
                      type="button"
                      onClick={ () => this.addToCart(item) }
                    >
                      +
                    </button>
                    <p>
                      {
                        loading ? <p>Loading</p>
                          : (
                            `R$ ${item.price * JSON
                              .parse(localStorage.getItem('cartItens'))
                              .filter((element) => element.id === item.id).length}`
                          )
                      }
                    </p>
                  </div>
                ))

            }
            <p data-testid="shopping-cart-product-quantity">{countItens}</p>
            <p>{total.toFixed(2)}</p>
          </div>
        </section>
      </div>
    );
  }
}
