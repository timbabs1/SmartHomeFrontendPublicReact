import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Card } from 'antd';
import Header from './components/header/header';
import Nav from './components/menu/menu';
import LightSwitch from './components/lightswitch/switch';

function App() {
  return (
    <div className="App">
      <Header title="Smart-Hub 4 U" />
      <Nav />
      <div style={{ background: '#ECECEC', padding: '30px' }}>
        <LightSwitch /> <br/>
        <Card title="Card title" bordered={false} style={{ width: 320 }}>
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
        </Card>
        </div> 
    </div>
  );
}

export default App;
