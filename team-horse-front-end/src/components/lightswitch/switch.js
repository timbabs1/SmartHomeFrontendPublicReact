import React from 'react';
import 'antd/dist/antd.css';
import { Switch, Button } from 'antd';
import Websocket from '../websocket';

class LightSwitch extends React.Component {
    constructor(props){
        super(props);

        this.state = {
          disabled: true
        }
    }

    handleData(data) {
      alert(data);
    }
    handleOpen()  {
      alert("connected:)");
    }
    handleClose() {
      alert("disconnected:(");
    }

    sendMessage(message){
      this.refWebSocket.sendMessage(message);
    }

    toggle = (message) => {
      this.setState({
        disabled: !this.state.disabled,
      });
    };


  render() {
    return (
      <div>
        <h1>Switch toggle for auto lights</h1>
        <Switch disabled={this.state.disabled} onClick={() => {
          if(this.state.disabled === true){
            this.sendMessage("off")
          }else{
            this.sendMessage("on")
          }
      }} defaultChecked /> 
        <br/>
        <br/>
        <Button type="primary" onClick={this.toggle}>
          Toggle disabled
        </Button>

        <Websocket url='ws://localhost:8000/requestlight' onMessage={this.handleData}
                onOpen={this.handleOpen} onClose={this.handleClose}
                reconnect={true} debug={true}
                ref={Websocket => {
                  this.refWebSocket = Websocket;
                }}/>
    </div>
        
    )
  }

}
export default LightSwitch

          