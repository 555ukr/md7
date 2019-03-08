import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import './../css/Header.css';
import {Input, Row, Button} from 'react-materialize';
import { Link } from 'react-router-dom';

class Header extends Component {
  render() {
    return (
      <div className="wrap">
        <img src={require('../logo.png')} />
        <div className="wallet">
          <Row>
            <Input type='textarea' label="Mnemonic pharase" />
          </Row>
          <Button className="red">Import</Button>
          <Link to='/wallet_new'><Button style={{margin: '20px'}} className="red">Create new</Button></Link>
        </div>
      </div>
    );
  }
}

export default Header;
