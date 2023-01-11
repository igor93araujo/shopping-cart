import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Search from './Search';

export default class Content extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route
            exact
            path="/"
            component={ Search }
          />
        </Switch>
      </div>
    );
  }
}
