import React, { Component } from 'react';
import { Navbar, NavItem, Row, Input, Button } from 'react-materialize';
import './../css/Header.css';

class Popup extends React.Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
      <div className='popup'>
        <div className='popup_inner'>
          <div className="right">
            <Button floating className='red' waves='light' icon='close' onClick={this.props.closePopup} />
          </div>
          <p>lol</p>
        </div>
      </div>
    );
  }
}

class Wallet extends Component {
  constructor(props){
    super(props);
    this.state = {
      showPopup: false,
    };
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
          <NavItem onClick={this.togglePopup.bind(this, "create")} >Create private key
          </NavItem>
          <NavItem onClick={this.togglePopup.bind(this, "import")}>Import private key</NavItem>
        </Navbar>
        <div className="main-wallet">
        <Row>
          <Input s={12} type='select' label="From" defaultValue='2'>
            <option value='1'>Address 1</option>
            <option value='2'>Address 2</option>
            <option value='3'>Address 3</option>
          </Input>
        </Row>
        <Row>
            <Input label="To" s={12} />
        </Row>
        <Button className="red">Send</Button>
        {this.state.showPopup ?
          <Popup
            text='Close Me'
            closePopup={this.togglePopup.bind(this)} status={this.state.status}
          />
          : null
        }
        </div>
      </div>
    );
  }
}

export default Wallet;
