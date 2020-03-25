import React from 'react';
import 'antd/dist/antd.css';
import { Switch, Button } from 'antd';
import Websocket from 'react-websocket';

class LightSwitch extends React.Component {
    constructor(props){
        super(props);

        this.state = {
          disabled: true,
          text: 'Enable Edit Mode',
          count: 0,
          switch_digit: 1,
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
      if (this.state.disabled === false){
        this.setState({text: "Enable Edit Mode", count: 0}) 
    } else {
      this.setState({text: "Disable Edit Mode", count: 1})
    }
    };

    onChange = () => {
          if (this.state.switch_digit === 1){
            this.setState({switch_digit: 0}) 
        } else {
          this.setState({switch_digit: 1})
        }
        const message = {
          Light_status : 0,
          Room : "bedroom 1"
        }
      this.sendMessage(JSON.stringify(message))
    }

    handleData(data) {
      let result = JSON.parse(data);
      this.setState({count: result.movement});
    }

    handleOpen()  {
      alert("connected:)");
    }

    handleClose() {
      alert("disconnected:(");
    }

    sendMessage(message){
      console.log(message.Room)
      this.refWebSocket.sendMessage(message);
      
     /* let websocket = Websocket
    websocket.sendMessage(message); */
    }

  render() {
    return (
      <div>
        <h1>Switch toggle for auto lights</h1>
        Count: <strong>{this.state.count}</strong>
        <Switch  onChange={this.onChange} checkedChildren="1" unCheckedChildren="0" disabled={this.state.disabled} /> <br/>
        <br/>
        <br/>
        <Button type="primary" onClick={this.toggle}>
        {this.state.text}
        </Button>
        <Websocket url='ws://localhost:8000/requestlight' onMessage={this.handleData.bind(this)}
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

          