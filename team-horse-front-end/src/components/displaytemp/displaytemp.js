import React from 'react';
import './displaytemp.css';
import { Card, Statistic, Row, Col, Button, InputNumber } from 'antd';

import Tempbutton from '../../components/tempbutton/tempbutton';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThermometer } from '@fortawesome/free-solid-svg-icons'
import { faBattery } from '@fortawesome/free-solid-svg-icons'

class Displaytemp extends React.Component {

    constructor(props){
        super(props);

        this.state = {
          
        }
    }

    render () {
        return (
            <div className="site-statistic-demo-card">
                <Row gutter={8}>
                    <Col span={6}>
                        <Card>
                            <Statistic title = "Current Temperature" value={"28°"} valueStyle={{ color: '#3f8600' }} prefix={<FontAwesomeIcon icon={faThermometer} />} />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card>
                            <Statistic title = "Target Temperature" value={"30°"} valueStyle={{ color: '#3f8600' }} prefix={<FontAwesomeIcon icon={faThermometer} />} />
                            <p className="ant-statistic-title">Input new target temperature below in degree celsius (°)</p>
                            <InputNumber min={-40} max={50} defaultValue={3} /* onChange={onChange} */ />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card>
                            <p className="ant-statistic-title">Select day and night temperature setting below</p>
                            <Tempbutton />
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Displaytemp