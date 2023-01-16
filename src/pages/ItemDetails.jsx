import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { TiArrowBack } from 'react-icons/ti';
import Header from '../components/Header';
import { getProductById } from '../services/api';
import '../App.css';
import Evaluation from '../components/Evaluation';
import { getItem, setItem } from '../services/LocalStorage';

const inicialState = {
  email: '',
  text: '',
  rating: '',
};

export default class ItemDetails extends Component {
  state = {
    ...inicialState,
    itemConteiner: [],
    isFreeShipping: false,
    evaluations: [],
    validRating: false,
  };

  componentDidMount() {
    this.getProductDetails();
    this.recoverRates();
  }

  getProductDetails = async () => {
    const { match: { params: { id } } } = this.props;
    this.setState({
      itemConteiner: [],
    });

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

  addToCart = (param) => {
    if (localStorage.length === 0) {
      localStorage.setItem('cartItens', JSON.stringify([param]));
      localStorage.setItem(`qnt-${param.id}`, JSON.stringify(1));
    } else {
      let myCart = [];
      const myPrevCart = JSON.parse(localStorage.getItem('cartItens'));
      const isAlreadyInCart = myPrevCart.some((e) => e.id === param.id);
      if (isAlreadyInCart) {
        myCart = myPrevCart;
      } else {
        myCart = [...myPrevCart, param];
      }
      localStorage.setItem('cartItens', JSON.stringify(myCart));
      localStorage.setItem(`qnt-${param.id}`, JSON.stringify(1));
    }
  };

  onChange = ({ target }) => {
    const { value, name } = target;
    const { email, text, rating } = this.state;
    this.setState({
      [name]: value,
    });

    if (email.length > 0 && text.length > 0 && rating.value !== null) {
      this.setState({
        validRating: true,
      });
    }
  };

  addRate = () => {
    const { match: { params: { id } } } = this.props;
    const { validRating } = this.state;

    const { email, text, rating } = this.state;
    if (validRating) {
      if (getItem(id) === null) {
        setItem(id, [{ email, text, rating }] || []);
      } else {
        const getPreview = getItem(id) || [];
        setItem(id, [...getPreview, { email, text, rating }]);
      }

      this.setState(((prevState) => ({
        evaluations: [...prevState.evaluations, { email, text, rating }],
        ...inicialState,
      })));
    }
  };

  recoverRates = () => {
    const { match: { params: { id } } } = this.props;
    let getRecovered = [];
    const localStorageData = getItem(id);

    if (localStorageData !== null) {
      (getRecovered = localStorageData);
    }

    return getRecovered;
  };

  render() {
    const {
      itemConteiner,
      isFreeShipping,
      validRating,
    } = this.state;

    const evaluation = this.recoverRates();
    console.log(evaluation);

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
          <div className="item-data">
            <div className="item-rate">
              <h2>Mais informações</h2>
              {isFreeShipping ? <p>Frete: Grátis</p> : <p>Frete: Calcule o frete</p>}
              <p>{`Quantidade disponível: ${itemConteiner.available_quantity}`}</p>
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
              <Evaluation
                addRate={ this.addRate }
                onChange={ this.onChange }
                removeComent={ this.removeComent }
                validRating={ validRating }
                email={ this.email }
                text={ this.text }
              />
            </div>
            {
              validRating === false ? <p data-testid="error-msg">Campos inválidos</p>
                : evaluation.map((coment) => (

                  <div className="itemRate" key={ coment.email }>
                    <div className="emailRate">
                      <p data-testid="review-card-email">
                        {coment.email}
                      </p>
                      <p
                        data-testid="review-card-rating"
                      >
                        {`Quantidade de estrelas: ${coment.rating}`}
                      </p>
                    </div>
                    <p data-testid="review-card-evaluation">{ coment.text }</p>
                  </div>
                ))
            }
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
