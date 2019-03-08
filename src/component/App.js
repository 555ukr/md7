import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom'
import './../css/App.css';
import Home from './Home.js';
import {Web3} from 'web3';
import {Accounts} from 'web3-eth-accounts';
import { ethers } from 'ethers';
import { bip39 } from 'bip39';

import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'

class App extends Component {
  constructor(props) {
    super(props);
    var Web3 = require('web3');
    var bip39 = require('bip39')

    var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545")); // ganache address

    //wallet creation
    let mnemonic = "radar blur cabbage chef fix engine embark joy scheme fiction master release";
    let mnemonicWallet = ethers.Wallet.fromMnemonic(mnemonic);
    console.log(mnemonicWallet);

    //mnemonic pharase generation
    // var mn = bip39.generateMnemonic();
    // console.log(mn);

    //-------------------------
    // create acount
    // var obj  = web3.eth.accounts.create('1');
    // console.log(obj);
    //-------------------------

  //   var EthereuSession = web3.eth.contract(
  //     [
  //     	{
  //     		"inputs": [],
  //     		"payable": false,
  //     		"stateMutability": "nonpayable",
  //     		"type": "constructor"
  //     	},
  //     	{
  //     		"constant": true,
  //     		"inputs": [],
  //     		"name": "vr",
  //     		"outputs": [
  //     			{
  //     				"name": "",
  //     				"type": "uint256"
  //     			}
  //     		],
  //     		"payable": false,
  //     		"stateMutability": "view",
  //     		"type": "function"
  //     	}
  //     ]
  //   );
  }
  // componentWillMount() {
  //   if(this.web3 && this.web3.isConnected()) {
  //     this.setState({isConnected: true});
  //   }
  // }



  render() {


    return (
      <div className="App">
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
