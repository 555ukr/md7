import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Index from './Index.js';
import Wallet from './Wallet.js';

class Home extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/'>
          <Index />
        </Route>
        <Route path='/wallet_new' >
          <Wallet />
        </Route>
      </Switch>
    );
  }
}

export default Home;
