import React from 'react';

import { Badge, Button, Row, Col, Card, Statistic, Switch, Carousel, TimePicker, Tabs, Alert  } from 'antd';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell } from '@fortawesome/free-solid-svg-icons'
import moment from 'moment'
import { NotificationOutlined } from '@ant-design/icons';

import Websocket from 'react-websocket';

import './alarm.css';

const { TabPane } = Tabs;

class Alarm extends React.Component {
    constructor(props){
        super(props);

        this.state = {
          alarmstate: "Off",
          alarmDigitState: 0,
          statecolour: 'red',
          open: false,
          open2: false,
          currentactivationtime: 'Not set',
          currentdeactivationtime: 'Not set',
          alarmtriggered: 'Off',
          triggeredcolour: 'red',
          silenttriggeredcolour: 'red',
          activeKey: "1",
          show: false,
          withsilent: 'Off',
          currentTime: '',
          switchChecked: false,
        }
    }

    componentDidMount() {
        this.interval = setInterval(() => this.setState({currentTime: moment().format('hh:mm:ss a')}), 1000)
        if (this.state.currentactivationtime === this.state.currentTime) {
            this.setState({alarmstate: "On"})
        }
        /* this.interval2 = setInterval( () => this.checkAlarmClock(), 1000) */
        /* this.interval = setInterval(() => this.setState({ time: Date.now() }), 1000); */
    }

    componentWillUnmount () {
        clearInterval(this.interval);
    }

    checkAlarmClock(){
        if (this.state.currentactivationtime === this.state.currentTime) {
            this.onChange()
            console.log('Alarm activated')
        } else if (this.state.currentdeactivationtime === this.state.currentTime) {
            this.onChange()
            console.log('Alarm deactivated')
        }
    }

    handleData(data) { //This is the incoming data from the websocket connection.
        const result = JSON.parse(data);
        console.log(result)
        if ('currentState' in result) {
            let a = Object.values(result.autoOnTime)
            this.setState({
                /* alarmDigitState : result.currentState[0].AlarmActivationState, */
                currentactivationtime : result.autoOnTime,
                currentdeactivationtime : result.autoOffTime,
            })
        }
        /* const result = JSON.parse(data);
        if ('currentState' in result) {
            this.setState({
                currentTemperatureBedroom: result.currentState[0].Temperature, // Current Temp
                currentTemperatureKitchen: result.currentState[1].Temperature,
                currentTemperatureBathroom: result.currentState[2].Temperature,
                targetTemperatureBedroom: result.currentState[0].Target_Temperature, //From the current state being sent.
                targetTemperatureKitchen: result.currentState[1].Target_Temperature,
                targetTemperatureBathroom: result.currentState[2].Target_Temperature,
            })
        } */
    }

    onChange = () => {
        if (this.state.alarmstate === "On" && this.state.alarmDigitState === 1) {
            this.setState({alarmstate: "Off",  alarmDigitState: 0, statecolour: 'red', switchchecked : false}) 
            //Set new states for Room updated
            let message = {
                AlarmActivationState: 0,
                autoOnTime: this.state.currentactivationtime,
                autoOffTime: this.state.currentdeactivationtime,
            }
            console.log(message.autoOnTime)
            this.sendMessage(JSON.stringify(message)) //Sends the message when a change occurs.
        } else if (this.state.alarmstate === "Off" && this.state.alarmDigitState === 0 ) {
            this.setState({alarmstate: "On", alarmDigitState: 1, statecolour: 'green', switchchecked : true})
            //Set new states for Room updated
            let message = {
                AlarmActivationState: 1,
                autoOnTime: this.state.currentactivationtime,
                autoOffTime: this.state.currentdeactivationtime,
            }
            console.log(message.AlarmActivationState)
            this.sendMessage(JSON.stringify(message)) //Sends the message when a change occurs.
            }
    }

    sendMessage(message) {
        console.log(message)
        this.refWebSocket.sendMessage(message); //Sends over the websocket. 

    }
    onChange4 = () => {
        if (this.state.alarmtriggered === "On" ) {
            this.setState({alarmtriggered: "Off", triggeredcolour: 'red', activeKey: "1", show: false}) 
        } else if (this.state.alarmtriggered === "Off" && this.state.withsilent === "Off" ) {
            this.setState({alarmtriggered: "On", triggeredcolour: 'green', activeKey: "3", show: true})
        } else if ( this.state.alarmtriggered === 'Off' && this.state.withsilent === "On" ) {
            this.setState({alarmtriggered: "On", triggeredcolour: 'green', activeKey: "2", show: true})
        }
    }

    onChange6 = () => {
        if (this.state.withsilent === "On") {
            this.setState({withsilent: "Off", silenttriggeredcolour: 'red'})
        } else if (this.state.withsilent === "Off") {
            this.setState({withsilent: "On", silenttriggeredcolour: 'green'})
        }
    }
    
    onChange2 = (time, timeString) => {
        this.setState({currentactivationtime: timeString})
    }

    onChange3 = (time, timeString) => {
        this.setState({currentdeactivationtime: timeString})
    }

    handleClose1 = () => this.setState({ open: false });

    handleClose2 = () => this.setState({ open: false });

    handleOpenChange = open => {
        this.setState({ open });
    };

    handleOpenChange2 = open2 => {
        this.setState({ open2 });
    };

    callback = (key)  => {
        console.log(key);
    }

    handleOpen() {
        console.log("Connected")
    }

    handleClose() {
        console.log("disconnected")
    }

  render() {
    return (
        <div>
            <Row gutter={8}>
                    <Col span={6}>
                        <Card>
                            <Statistic title = "Current Alarm State" value={this.state.alarmstate} valueStyle={{ color: this.state.statecolour }} prefix={<FontAwesomeIcon icon={faBell} />} />
                            <p className="ant-statistic-title">Switch toggle to turn alarm on or off</p>
                            <Switch  onChange={this.onChange} checked={this.state.switchchecked} checkedChildren="On" unCheckedChildren="Off" disabled={this.state.disabled} />
                            <Statistic title = "Current Alarm Triggered State" value={this.state.alarmtriggered} valueStyle={{ color: this.state.triggeredcolour }} prefix={<FontAwesomeIcon icon={faBell} />} />
                            <p className="ant-statistic-title">Switch toggle to trigger alarm manually or deactivate manually</p>
                            <Switch  onChange={this.onChange4} checkedChildren="On" unCheckedChildren="Off" disabled={this.state.disabled} />
                            <Statistic title = "Current Alarm Silent Mode State" value={this.state.withsilent} valueStyle={{ color: this.state.silenttriggeredcolour }} prefix={<FontAwesomeIcon icon={faBell} />} />
                            <p className="ant-statistic-title">Set alarm silent mode state (On to activate silent mode) (To trigger alarm in silent mode, activate switch and trigger alarm on manually or via timer) </p>
                            <Switch  onChange={this.onChange6} checkedChildren="On" unCheckedChildren="Off" disabled={this.state.disabled} />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card>
                        <p className="ant-statistic-title">Set alarm activation time</p>
                            <TimePicker use12Hours format="hh:mm:ss a" onChange={this.onChange2} defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} open={this.state.open} onOpenChange={this.handleOpenChange} 
                            addon={() => (
                                <Button size="small" type="primary" onClick={this.handleClose1}>
                                    Ok
                                </Button>
                                )} />
                        </Card>
                         <Card>
                            <p className="ant-statistic-title">Set alarm deactivation time</p>
                            <TimePicker use12Hours format="hh:mm:ss a" onChange={this.onChange3} defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} open2={this.state.open2} onOpenChange2={this.handleOpenChange2} 
                            addon={() => (
                                <Button size="small" type="primary" onClick={this.handleClose2}>
                                    Ok
                                </Button>
                                )} />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card>
                            <Statistic title = "Current Alarm Activation time" value={this.state.currentactivationtime} valueStyle={{ color: 'green' }} prefix={<FontAwesomeIcon icon={faBell} />} />
                        </Card>
                        
                        <Card>
                            <Statistic title = "Current Alarm Dectivation time" value={this.state.currentdeactivationtime} valueStyle={{ color: 'red' }} prefix={<FontAwesomeIcon icon={faBell} />} />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card>
                            <Statistic title = "Current time" value={moment().format('MMMM Do YYYY, h:mm:ss a')} />
                        </Card>
                    </Col>
            </Row>
            <Row gutter={8}>
                <Tabs defaultActiveKey="1" onChange={this.callback} activeKey= {this.state.activeKey}>
                    <TabPane tab={<span><Badge dot = {this.state.show}><NotificationOutlined /></Badge> Alarm Deactivated</span>} key="1">
                    <div className = "slide1">
                    <h3 className="ant-statistic-title">Alarm Deactivated</h3>
                    </div>
                    </TabPane>
                    <TabPane tab={<span><Badge dot = {this.state.show}><NotificationOutlined /></Badge> Alarm Triggered</span>} key="2">
                    <div className = "slide2">
                    <h3 className="ant-statistic-title">Alarm Triggered!(Silent mode)</h3>
                    </div>
                    </TabPane>
                    <TabPane tab={<span><Badge dot = {this.state.show}><NotificationOutlined /></Badge> Alarm Triggered(Non-silent mode)</span>} key="3">
                    <div className = "slide3">
                    <h3 className="ant-statistic-title">Alarm Triggered!(Non Silent mode)</h3>
                    </div>
                    </TabPane>
                </Tabs>
            </Row>

            <Websocket url='ws://localhost:8000/requestalarm' onMessage={this.handleData.bind(this)}
                    onOpen={this.handleOpen} onClose={this.handleClose}
                    reconnect={true} debug={true}
                    ref={Websocket => { this.refWebSocket = Websocket; }} />
        </div>
    )
  }

}
export default Alarm