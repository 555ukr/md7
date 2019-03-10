import React, { Component } from 'react';
import './../css/Header.css';
import { Navbar, NavItem, Row, Input, Button } from 'react-materialize';


class Multisig extends Component {
  render() {
    return (
      <div className="wrap">
        <Navbar style={{background: 'rgb(80, 120, 150)'}} right>
          <NavItem  >Wallet</NavItem>
          <NavItem  >Log Out</NavItem>
        </Navbar>
        
      </div>
    );
  }
}

export default Multisig;
