import React from 'react';
import Websocket from 'react-websocket';
import './displaytemp.css';
import { Card, Statistic, Row, Col, InputNumber } from 'antd';
import Tempbutton from '../../components/tempbutton/tempbutton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThermometer } from '@fortawesome/free-solid-svg-icons';


class Displaytemp extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            currentTemperatureBedroom: 0,
            currentTemperatureKitchen: 0,
            currentTemperatureBathroom: 0,
            targetTemperatureBedroom: 0,
            targetTemperatureKitchen: 0,
            targetTemperatureBathroom: 0,
            changingTargetBedroomValue: 0,
            changingTargetKitchenValue: 0,
            changingTargetBathroomValue: 0,
        }
    }

    sendMessage(message) {
        this.refWebSocket.sendMessage(message); //Sends over the websocket.
    }

    handleData(data) {
        let result = JSON.parse(data);
        if ('currentState' in result) {
            this.setState({
                currentTemperatureBedroom: result.currentState[0].Temperature,
                currentTemperatureKitchen: result.currentState[1].Temperature,
                currentTemperatureBathroom: result.currentState[2].Temperature,
                targetTemperatureBedroom: result.currentState[0].Target_Temperature,
                targetTemperatureKitchen: result.currentState[1].Target_Temperature,
                targetTemperatureBathroom: result.currentState[2].Target_Temperature
            })
        }
    }

    handleOpen() {
        console.log("Connected")
    }

    handleClose() {
        console.log("disconnected")
    }
    onChange = (value, Room) => {
        let message = {}
        if (Room === "Bedroom") { //Set new states for Room updated
            this.setState({ targetTemperatureBedroom: value })
            message = {
                Target_Temperature: this.targetTemperatureBedroom,
                Room: "Bedroom"
            }
        } if (Room === "Kitchen") {
            this.setState({ targetTemperatureKitchen: value })
            message = {
                Target_Temperature: this.state.targetTemperatureKitchen,
                Room: "Kitchen"
            }
        } if (Room === "Bathroom") {
            this.setState({ targetTemperatureBathroom: value })
            message = {
                Target_Temperature: this.state.targetTemperatureBathroom,
                Room: "Bathroom"
            }
        }
        this.sendMessage(JSON.stringify(message)) //Sends the message when a change occurs.
    }

    render() {
        return (
            <div className="site-statistic-demo-card">
                <Row gutter={8}>
                    <Col span={8}>
                        <Card>
                            <h3>Bedroom</h3>
                        </Card>
                        <Card>
                            <Statistic title="Current Temperature" value={this.state.currentTemperatureBedroom} valueStyle={{ color: '#3f8600' }} prefix={<FontAwesomeIcon icon={faThermometer} />} />
                        </Card>
                        <Card>
                            <Statistic title="Target Temperature" value={this.state.targetTemperatureBedroom} valueStyle={{ color: '#3f8600' }} prefix={<FontAwesomeIcon icon={faThermometer} />} />
                            <p className="ant-statistic-title">Input new target temperature below in degree celsius (°)</p>
                            <InputNumber min={-40} max={50} defaultValue={3} /*onChange={this.onChange("Bedroom")}*/ />
                        </Card>
                        <Card>
                            <p className="ant-statistic-title">Select day and night temperature setting below</p>
                            <Tempbutton />
                        </Card>
                    </Col>

                    <Col span={8}>
                        <Card>
                            <h3>Kitchen</h3>
                        </Card>
                        <Card>
                            <Statistic title="Current Temperature" value={this.state.currentTemperatureKitchen} valueStyle={{ color: '#3f8600' }} prefix={<FontAwesomeIcon icon={faThermometer} />} />
                        </Card>
                        <Card>
                            <Statistic title="Target Temperature" value={this.state.targetTemperatureKitchen} valueStyle={{ color: '#3f8600' }} prefix={<FontAwesomeIcon icon={faThermometer} />} />
                            <p className="ant-statistic-title">Input new target temperature below in degree celsius (°)</p>
                            <InputNumber min={-40} max={50} defaultValue={3} /*onChange={this.onChange("Kitchen")}*/ />
                        </Card>
                        <Card>
                            <p className="ant-statistic-title">Select day and night temperature setting below</p>
                            <Tempbutton />
                        </Card>
                    </Col>

                    <Col span={8}>
                        <Card >
                            <h3>Bathroom</h3>
                        </Card>
                        <Card>
                            <Statistic title="Current Temperature" value={this.state.currentTemperatureBathroom} valueStyle={{ color: '#3f8600' }} prefix={<FontAwesomeIcon icon={faThermometer} />} />
                        </Card>
                        <Card>
                            <Statistic title="Target Temperature" value={this.state.targetTemperatureBathroom} valueStyle={{ color: '#3f8600' }} prefix={<FontAwesomeIcon icon={faThermometer} />} />
                            <p className="ant-statistic-title">Input new target temperature below in degree celsius (°)</p>
                            <InputNumber min={-40} max={50} defaultValue={3} /*onChange={this.onChange("Bathroom")}*/ />
                        </Card>
                        <Card>
                            <p className="ant-statistic-title">Select day and night temperature setting below</p>
                            <Tempbutton />
                        </Card>
                    </Col>
                </Row>

                <Websocket url='ws://localhost:8000/requesttemp' onMessage={this.handleData.bind(this)}
                    onOpen={this.handleOpen} onClose={this.handleClose}
                    reconnect={true} debug={true}
                    ref={Websocket => {this.refWebSocket = Websocket;}} />
            </div>
        )
    }
}

export default Displaytemp