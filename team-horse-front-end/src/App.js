import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Card } from 'antd';
import Header from './components/header/header';
import Nav from './components/menu/menu';
import LightSwitch from './components/lightswitch/switch';
import Displaytemp from './components/displaytemp/displaytemp'
import Alarm from './components/alarm/alarm'

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentMenuItem: "lights"
    };
  }

  changeMenu(menu) {
    this.setState({
      currentMenuItem: menu.currentMenu
    })
    console.log(menu.currentMenu)
  }

  render(){

    let whatToRender

    if(this.state.currentMenuItem === "lights"){
      whatToRender = 
      <div>
        <div style={{ background: '#ECECEC', padding: '30px' }}>
          <LightSwitch /> <br/>
          <Card title="Light Configuration" bordered={false} style={{ width: 320 }}>
          <p>Brightness Level</p>
          <p>Dim Level</p>
          <p>Wattage</p>
          </Card>
        </div>
      </div>
    }
    else if(this.state.currentMenuItem === "temperature") {
      whatToRender =
      <div>
        <div>
          <Displaytemp />
        </div> 
      </div>
    }
    else if(this.state.currentMenuItem === "alarm") {
      whatToRender =
      <div>
        <Alarm />
      </div>
    }
  return (
    <div className="App">
      <Header title="Smart-Hub 4 U" />
      <Nav changeView={this.changeMenu.bind(this)} />
      {whatToRender}
    </div>
  );
  }
}

export default App;
