import React, { Component } from 'react';
import { Navbar, NavItem, Row, Input, Button } from 'react-materialize';
import './../css/Header.css';
import Popup from './Popup.js';
import {Web3} from 'web3';
import {Accounts} from 'web3-eth-accounts';
import { ethers } from 'ethers';
import { bip39 } from 'bip39';
import { Link } from 'react-router-dom';
// import { ethereumjs-tx } from 'ethereumjs-tx';


class Wallet extends Component {
  constructor(props){
    super(props);
    this.state = {
      showPopup: false,
    };

    var Web3 = require('web3');
    var bip39 = require('bip39')

    var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545")); // ganache address

    //wallet creation
    let mnemonic = bip39.generateMnemonic();

    let mnemonicWallet = ethers.Wallet.fromMnemonic(mnemonic);
    this.state = {
      wallet: mnemonicWallet,
      web3: web3,
      addreses: [mnemonicWallet.address],
      privateKey: [mnemonicWallet.privateKey]
    }
    this.getNonce = this.getNonce.bind(this);
  }

  getNonce(){
    this.state.web3.eth.getTransactionCount("0xB1FBbb55df6581d504e004c8b7233ccC8530a57a").then((error, result) => {
      console.log(error)
      return error;
      // console.log(error, result)
    });
  }

  sendEther(){

    var Tx = require('ethereumjs-tx');

    this.state.web3.eth.getTransactionCount("0xB1FBbb55df6581d504e004c8b7233ccC8530a57a").then((result) => {
      var gasPrice = 2;//or get with web3.eth.gasPrice
      var gasLimit = 3000000;

      let nonce = result;
      console.log(nonce)
      var rawTransaction = {
        "from": "0xB1FBbb55df6581d504e004c8b7233ccC8530a57a",
        "nonce": this.state.web3.utils.toHex(nonce),
        "gasPrice": this.state.web3.utils.toHex(gasPrice * 10e9),
        "gasLimit": this.state.web3.utils.toHex(gasLimit),
        "to": "0x04c73C3e48cf032405c3ca2f642C063cAc9F50E1",
        "value": 10e18 ,
      };
      var privateKey = "8dfe3160e9855dfb6e3597e82b5846b09e20dcf5123018a89a28dfc5a632b841"
      var privKey = new Buffer(privateKey, 'hex');
      var tx = new Tx(rawTransaction);

      tx.sign(privKey);
      var serializedTx = tx.serialize();

      this.state.web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'), function(err, hash) {
        if (!err)
            {
              console.log('Txn Sent and hash is '+hash);
            }
        else
            {
              console.error(err);
            }
      });
    });

  }

  changeBalance(balance){
    this.setState({ balance: balance });
  }

  componentDidMount() {
    this.state.web3.eth.getBalance(this.state.addreses[0]).then(this.changeBalance.bind(this));
  }

  handleChange(e) {
    this.setState({ input: e.target.value });
    this.state.web3.eth.getBalance(this.state.addreses[e.target.value]).then(this.changeBalance.bind(this));
  }

  addAddress(addr, prv){
    let newAddr = this.state.addreses.push(addr);
    let newPrv = this.state.privateKey.push(prv);
  }

  togglePopup(param) {
    this.setState({
      showPopup: !this.state.showPopup,
      status: param,
    });
  }

  render() {
    return (
      <div className="wrap">
        <Navbar style={{background: 'rgb(80, 120, 150)'}} right>
          <NavItem  >Display mnemonic key</NavItem>
          <NavItem ><Link to="/multisig">Create multisig wallet</Link></NavItem>
          <NavItem onClick={this.togglePopup.bind(this, "create")} >Create private key</NavItem>
          <NavItem onClick={this.togglePopup.bind(this, "import")}>Import private key</NavItem>
          <NavItem  >Log Out</NavItem>
        </Navbar>
        <div className="main-wallet">
        <Row>
          <label>Balance</label>
            <Input style={{ width:"300px" }} s={12} value={this.state.balance} disabled />
        </Row>
        <Row>
          <Input type='select' label="From" defaultValue='0' style={{ width:"300px" }} onChange={ this.handleChange.bind(this) }>
            {this.state.addreses.map((item, index) => (
                <option key={index} value={index}>{item}</option>
              ))}
          </Input >
        </Row>
        <Row>
            <Input style={{ width:"420px" }} label="To" s={12} />
        </Row>
        <Button className="red" onClick={this.sendEther.bind(this)} >Send</Button>
        {this.state.showPopup ?
          <Popup
            text='Close Me'
            closePopup={this.togglePopup.bind(this)}
            status={this.state.status}
            addParam={this.addAddress.bind(this)}
          />
          : null
        }
        </div>
      </div>
    );
  }
}

export default Wallet;
