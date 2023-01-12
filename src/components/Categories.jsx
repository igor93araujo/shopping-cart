import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { getCategories } from '../services/api';
import '../App.css';

export default class Categories extends Component {
  state = {
    categories: [],
  };

  componentDidMount() {
    this.createCategories();
  }

  createCategories = async () => {
    const categories = await getCategories();
    this.setState({
      categories,
    });
  };

  render() {
    const { categories } = this.state;
    const { categoriesItems } = this.props;

    return (
      <div>
        <p className="category-title">Categorias</p>
        {
          categories.map((category) => (
            <div key={ category.id } className="category">
              <input
                type="radio"
                id={ category.id }
                name="category"
                data-testid="category"
                value={ category.name }
                onClick={ categoriesItems }
              />
              <label htmlFor={ category.id }>{ category.name }</label>
            </div>
          ))
        }
      </div>
    );
  }
}

Categories.propTypes = {
  categoriesItems: PropTypes.func.isRequired,
};
