import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import Header from '../components/Header';
import { getItem } from '../services/LocalStorage';
import '../App.css';

export default class Buy extends Component {
  state = {
    fullName: '',
    email: '',
    cpf: '',
    phone: '',
    cep: '',
    address: '',
    payment: '',
    isValidated: true,
  };

  componentDidMount() {
    this.getCartDetails();
  }

  onClick = (event) => {
    event.preventDefault();
    const { history } = this.props;
    const valData = this.validateParam();
    if (valData) {
      const myCart = getItem('cartItens');
      localStorage.removeItem('cartItens');
      myCart.forEach((e) => {
        localStorage.removeItem(`qnt-${e.id}`);
      });
      this.setState({
        isValidated: true,
      });
      return history.push('/');
    }
    this.setState({
      isValidated: false,
    });
  };

  onChange = ({ target }) => {
    const { value, name } = target;
    this.setState({
      [name]: value,
    });
  };

  validateParam = () => {
    const { fullName, email, cpf, phone, cep, address, payment } = this.state;
    const valName = fullName.length > 0;
    const valEmail = email.length > 0;
    const valCpf = cpf.length > 0;
    const valPhone = phone.length > 0;
    const valcep = cep.length > 0;
    const valAddress = address.length > 0;
    const valPayment = payment.length > 0;
    return (valName && valEmail && valCpf
      && valPhone && valcep && valAddress && valPayment);
  };

  getCartDetails = () => {
    const myCartItens = getItem('cartItens');
    return myCartItens;
  };

  render() {
    const { fullName, email, cpf, phone, cep,
      address, payment, isValidated } = this.state;
    let myCart = this.getCartDetails();
    if (myCart === null) (myCart = []);
    const total = myCart.reduce((acc, curr) => {
      const qnt = JSON.parse(localStorage.getItem(`qnt-${curr.id}`));
      acc += qnt * curr.price;
      return acc;
    }, 0);
    return (
      <div>
        <Header />
        <div className="cart-message">
          {myCart.map((e) => (
            <div key={ e.id } className="cart-item">
              <span>{ e.title }</span>
              <img src={ e.thumbnail } alt={ e.title } />
              <p>{`Preço: ${e.price}`}</p>
              <p>
                {`Quantidade: ${getItem(`qnt-${e.id}`)}`}
              </p>
              <p>
                {
                  `Total por item: R$ ${(e.price * getItem(`qnt-${e.id}`)).toFixed(2)
                    .replace('.', ',')
                  }`
                }
              </p>
            </div>
          ))}
        </div>
        <div className="finish-shop">
          <p>{`Total: ${total.toFixed(2)}`}</p>
          <form forHTML="">
            <div className="form-title">
              <h2>Formulário de compra</h2>
            </div>
            <div>
              <input
                type="text"
                data-testid="checkout-fullname"
                value={ fullName }
                name="fullName"
                placeholder="Nome Completo"
                onChange={ this.onChange }
              />
              <input
                type="email"
                data-testid="checkout-email"
                value={ email }
                name="email"
                placeholder="email"
                onChange={ this.onChange }
              />
              <input
                type="text"
                data-testid="checkout-cpf"
                value={ cpf }
                name="cpf"
                placeholder="CPF"
                onChange={ this.onChange }
              />
            </div>
            <div>
              <input
                type="text"
                data-testid="checkout-phone"
                value={ phone }
                name="phone"
                placeholder="Telefone"
                onChange={ this.onChange }
              />
              <input
                type="text"
                data-testid="checkout-cep"
                value={ cep }
                name="cep"
                placeholder="CEP"
                onChange={ this.onChange }
              />
              <input
                type="text"
                data-testid="checkout-address"
                value={ address }
                name="address"
                placeholder="Endereço"
                onChange={ this.onChange }
              />
            </div>
            <label
              htmlFor="radio"
              value={ payment }
            >
              <input
                type="radio"
                name="payment"
                value="Boleto"
                data-testid="ticket-payment"
                onChange={ this.onChange }
              />
              Boleto
              <input
                type="radio"
                name="payment"
                value="Visa"
                data-testid="visa-payment"
                onChange={ this.onChange }
              />
              Visa
              <input
                type="radio"
                name="payment"
                value="MasterCard"
                data-testid="master-payment"
                onChange={ this.onChange }
              />
              MaterCard
              <input
                type="radio"
                name="payment"
                value="Elo"
                data-testid="elo-payment"
                onChange={ this.onChange }
              />
              Elo
            </label>
            <br />
            <button
              type="submit"
              onClick={ this.onClick }
              data-testid="checkout-btn"
              className="finish-btn"
            >
              Comprar
            </button>
            { !isValidated && <p data-testid="error-msg">Campos inválidos</p> }
          </form>

        </div>
      </div>
    );
  }
}

Buy.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
