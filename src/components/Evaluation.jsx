import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import '../App.css';

export default class Evaluation extends Component {
  render() {
    const { onChange, email, text, rating, addRate } = this.props;
    return (
      <section className="item-eval">
        <h2>Avaliações</h2>
        <form className="product-input">
          <div>
            <input
              type="email"
              value={ email }
              name="email"
              id="email"
              placeholder="email"
              onChange={ onChange }
              data-testid="product-detail-email"
            />
            <label
              htmlFor="radio"
              data-testid="product-card-rating"
              value={ rating }
            >
              <input
                type="radio"
                name="rating"
                value="1"
                onChange={ onChange }
                checked={ onchange }
                data-testid="1-rating"
              />
              1
              <input
                type="radio"
                name="rating"
                value="2"
                onChange={ onChange }
                data-testid="2-rating"
                checked={ onchange }
              />
              2
              <input
                type="radio"
                name="rating"
                value="3"
                onChange={ onChange }
                data-testid="3-rating"
                checked={ onchange }
              />
              3
              <input
                type="radio"
                name="rating"
                value="4"
                onChange={ onChange }
                data-testid="4-rating"
                checked={ onchange }
              />
              4
              <input
                type="radio"
                name="rating"
                value="5"
                onChange={ onChange }
                data-testid="5-rating"
                checked={ onchange }
              />
              5
            </label>
          </div>
          <textarea
            name="text"
            id="text"
            cols="30"
            rows="10"
            placeholder="Deixe seu comentário (opicional)"
            data-testid="product-detail-evaluation"
            value={ text }
            onChange={ onChange }
          />
          <button
            type="button"
            className="rate-btn"
            data-testid="submit-review-btn"
            onClick={ addRate }
          >
            Avaliar

          </button>
        </form>
      </section>
    );
  }
}

Evaluation.propTypes = {
  onChange: PropTypes.func,

}.isRequired;
