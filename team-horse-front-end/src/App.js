import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Card } from 'antd';
import Header from './components/header/header';
import Nav from './components/menu/menu';
import LightSwitch from './components/lightswitch/switch';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render(){
  return (
    <div className="App">
      <Header title="Smart-Hub 4 U" />
      <Nav />
      <div style={{ background: '#ECECEC', padding: '30px' }}>
        <LightSwitch /> <br/>
        <Card title="Light Configuration" bordered={false} style={{ width: 320 }}>
        <p>Brightness Level</p>
        <p>Dim Level</p>
        <p>Wattage</p>
        </Card>
        </div> 
    </div>
  );
  }
}

export default App;
