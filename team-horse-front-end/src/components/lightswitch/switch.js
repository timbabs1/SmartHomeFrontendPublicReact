import React from 'react';
import 'antd/dist/antd.css';
import SliderComponent from '../lightslider/slider'
import { Switch, Card } from 'antd';
import Websocket from 'react-websocket';

class LightSwitch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: 'Enable Edit Mode',
      count: 0,
      bedroomLightStatus: 'Off',
      kitchenLightStatus: 'Off',
      bathroomLightStatus: 'Off',
      bedroomSwitchState: false,
      kitchenSwitchState: false,
      bathroomSwitchState: false,
    }
  }

  //Do stuff with data from this method.
  handleData(data) {
    let result = JSON.parse(data);
    if ('CurrentState' in result[0]) {
      if (result[0].CurrentState === 1) {
        this.setState({ bedroomLightStatus: "Light switched on", bedroomSwitchState: true })
      } else {
        this.setState({ bedroomLightStatus: "Off", bedroomSwitchState: false })
      }
      if (result[1].CurrentState === 1) {
        this.setState({ kitchenLightStatus: "Light switched on", kitchenSwitchState: true })
      } else {
        this.setState({ kitchenLightStatus: "Off", kitchenSwitchState: false  })
      }
      if (result[2].CurrentState === 1) {
        this.setState({ bathroomLightStatus: "Light switched on", bathroomSwitchState: true })
      } else {
        this.setState({ bathroomLightStatus: "Off", bathroomSwitchState: false  })
      }
    }
  }

  handleOpen() {
    console.log("Connected")
  }

  handleClose() {
    console.log("disconnected")
  }

  sendMessage(message) {
    this.refWebSocket.sendMessage(message); //Sends over the websocket.
  }

  handleSlider = (incValue, roomName) => {

    const message = {
      LightSetting: incValue,
      Room: roomName
    }
    this.sendMessage(JSON.stringify(message)) //Sends the message when a change occurs.
  }
  onChange = roomName => value => {
    let message = {}
    console.log(value)
    if (value === true && roomName === "Bedroom") { //Determines how to swap the toggle. 
      message = {
        Light_status: 1,
        Room: roomName
      }
    }else if (value === false && roomName === "Bedroom"){
      message = {
        Light_status: 0,
        Room: roomName
      }
    }
    if (value === true && roomName === "Kitchen") { //Determines how to swap the toggle. 
      message = {
        Light_status: 1,
        Room: roomName
      }
    }else if (value === false && roomName === "Kitchen"){
      message = {
        Light_status: 0,
        Room: roomName
      }
    }
    if (value === true && roomName === "Bathroom") { //Determines how to swap the toggle. 
      message = {
        Light_status: 1,
        Room: roomName
      }
    }else if (value === false && roomName === "Bathroom"){
      message = {
        Light_status: 0,
        Room: roomName
      }
    }

    this.sendMessage(JSON.stringify(message)) //Sends the message when a change occurs.
  }

  onClick = roomName => e => {
    if (e === false && roomName === "Bedroom") {
      this.setState({ bedroomSwitchState: false })
    } else if(e === true && roomName === "Bedroom") {
      this.setState({ bedroomSwitchState: true})
    }

    if (e === false && roomName === "Kitchen") {
      this.setState({ kitchenSwitchState: false })
    } else if(e === true && roomName === "Kitchen") {
      this.setState({ kitchenSwitchState: true})
    }

    if (e === false && roomName === "Bathroom") {
      this.setState({ bathroomSwitchState: false })
    } else if(e === true && roomName === "Bathroom") {
      this.setState({ bathroomSwitchState: true})
    }
  }
  
  render() {
    return (
      <div>
        <h1>Switch toggle for auto lights</h1>
        <Card title="Light Configuration" bordered={false} style={{ width: 320 }}>
          <p>Bedroom:   <b>{this.state.bedroomLightStatus}</b> <Switch onChange={this.onChange("Bedroom")} onClick={this.onClick("Bedroom")} checked={this.state.bedroomSwitchState} checkedChildren="On" unCheckedChildren="Off" /></p>
          <p>Kitchen:   <b>{this.state.kitchenLightStatus}</b> <Switch onChange={this.onChange("Kitchen")} onClick={this.onClick("Kitchen")} checked={this.state.kitchenSwitchState} checkedChildren="On" unCheckedChildren="Off" /></p>
          <p>Bathroom:  <b>{this.state.bathroomLightStatus}</b> <Switch onChange={this.onChange("Bathroom")} onClick={this.onClick("Bathroom")} checked={this.state.bathroomSwitchState} checkedChildren="On" unCheckedChildren="Off" /></p>
        </Card>

        <SliderComponent sliderHandler={this.handleSlider} />
        <Websocket url='ws://localhost:8000/requestlight' onMessage={this.handleData.bind(this)}
          onOpen={this.handleOpen} onClose={this.handleClose}
          reconnect={true} debug={true}
          ref={Websocket => {
            this.refWebSocket = Websocket;
          }} />
      </div>
    )
  }
}
export default LightSwitch

