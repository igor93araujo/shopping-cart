import React, { Component } from 'react';
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
              />
              <label htmlFor={ category.id }>{ category.name }</label>
            </div>
          ))
        }
      </div>
    );
  }
}
