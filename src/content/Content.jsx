import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Cart from '../pages/Cart';
import Home from '../pages/Home';
import ItemDetails from '../pages/ItemDetails';

export default class Content extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route
            exact
            path="/"
            component={ Home }
          />
          <Route
            exact
            path="/cart"
            component={ Cart }
          />
          <Route
            exact
            path="/:id"
            component={ ItemDetails }
          />
        </Switch>
      </div>
    );
  }
}
