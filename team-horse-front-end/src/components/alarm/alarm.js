import React from 'react';

import { Button, Row, Col, Card, Statistic, Switch } from 'antd';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell } from '@fortawesome/free-solid-svg-icons'
import { TimePicker } from 'antd';
import moment from 'moment'

const { RangePicker } = TimePicker;

class Alarm extends React.Component {
    constructor(props){
        super(props);

        this.state = {
          alarmstate: "Off",
          statecolour: 'red',
          open: false,
          open2: false,
          currentactivationtime: 'Not set',
          currentdeactivationtime: 'Not set',
        }
    }

    onChange = () => {
        if (this.state.alarmstate === "On" ) {
            this.setState({alarmstate: "Off", statecolour: 'red'}) 
        } else if (this.state.alarmstate === "Off" ) {
            this.setState({alarmstate: "On", statecolour: 'green'})
        }
    }
    onChange2 = (time, timeString) => {
        console.log(time, timeString);
        this.setState({currentactivationtime: timeString})
    }

    onChange3 = (time, timeString) => {
        console.log(time, timeString);
        this.setState({currentdeactivationtime: timeString})
    }

    handleClose = () => this.setState({ open: false });

    handleClose2 = () => this.setState({ open: false });

    handleOpenChange = open => {
        this.setState({ open });
    };

    handleOpenChange2 = open2 => {
        this.setState({ open2 });
    };

  render() {
    return (
        <div>
            <Row gutter={8}>
                    <Col span={6}>
                        <Card>
                            <Statistic title = "Current Alarm State" value={this.state.alarmstate} valueStyle={{ color: this.state.statecolour }} prefix={<FontAwesomeIcon icon={faBell} />} />

                            <p className="ant-statistic-title">Switch toggle to turn alarm on or off</p>
                            <Switch  onChange={this.onChange} checkedChildren="On" unCheckedChildren="Off" disabled={this.state.disabled} />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card>
                        <p className="ant-statistic-title">Set alarm activation time</p>
                            <TimePicker onChange={this.onChange2} defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} open={this.state.open} onOpenChange={this.handleOpenChange} 
                            addon={() => (
                                <Button size="small" type="primary" onClick={this.handleClose}>
                                    Ok
                                </Button>
                                )} />
                        </Card>
                         <Card>
                            <p className="ant-statistic-title">Set alarm deactivation time</p>
                            <TimePicker onChange={this.onChange3} defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} open2={this.state.open2} onOpenChange2={this.handleOpenChange2} 
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
            </Row>
        </div>
    )
  }

}
export default Alarm