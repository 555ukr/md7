import React, { Component } from 'react';
import { Navbar, NavItem, Row, Input, Button, Collection, CollectionItem } from 'react-materialize';
import './../css/Header.css';
import {Web3} from 'web3';

class Popup extends React.Component {
  constructor(props){
    super(props);
    if (this.props.status == "create"){
      var Web3 = require('web3');
      var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
      var obj  = web3.eth.accounts.create(web3.utils.randomHex(32));
      this.state = {
        address: obj.address,
        privatKey: obj.privateKey,
      };
    } else{
      // web3.eth.accounts.privateKeyToAccount(privateKey);
      this.state = {
        address: "",
        privatKey: ""
      };
    }
  }

  handleChange(e) {
    this.setState({ input: e.target.value });
  }

  makeKey(){
    console.log("1")
    var Web3 = require('web3');
    var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
    let obj = web3.eth.accounts.privateKeyToAccount(this.state.input);
    this.setState({
      address: obj.address,
      privatKey: obj.privateKey,
    });
  }

  callAdd(){
    this.props.addParam(this.state.address, this.state.privatKey)
    this.props.closePopup()
  }

  render() {

    const create = (
      <div className="top">
        <Collection header='Address'>
          <CollectionItem>{this.state.address}</CollectionItem>
        </Collection>
        <Collection header='Private key'>
          <CollectionItem>{this.state.privatKey}</CollectionItem>
        </Collection>
        <Button large className="red" onClick={this.callAdd.bind(this)}>Add</Button>
    </div>
    );

    const iprt = (
      <div className="topB">
        <Row>
            <Input placeholder="Placeholdel" s={12} onChange={ this.handleChange.bind(this) } label="Private key" />
        </Row>
        <Button large className="red" onClick={ this.makeKey.bind(this) }>Import</Button>
      </div>
    );

    const newIprt = (
      <div className="top">
        <Collection header='Address'>
          <CollectionItem>{this.state.address}</CollectionItem>
        </Collection>
        <Collection header='Private key'>
          <CollectionItem>{this.state.privatKey}</CollectionItem>
        </Collection>
        <Button large className="red" onClick={this.callAdd.bind(this)}>Add</Button>
    </div>
    );

    return (
      <div className='popup'>
        <div className='popup_inner'>
          <div className="right">
            <Button floating className='red' waves='light' icon='close' onClick={this.props.closePopup} />
          </div>
          {this.props.status == "create" ?
            create
            : ( this.state.privatKey == "" ? iprt : newIprt)
          }
        </div>
      </div>
    );
  }
}

export default Popup;
