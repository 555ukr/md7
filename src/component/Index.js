import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from './Header.js';

class Index extends Component {
  render() {
    return (
      <div>
        <Header />
      </div>
    );
  }
}

export default Index;
