import React, { Component } from 'react';
import { getCategories } from '../services/api';

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
        {
          categories.map((category) => (
            <div key={ category.id }>
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
