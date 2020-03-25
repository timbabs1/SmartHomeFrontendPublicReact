import React from 'react';
import './displaytemp.css';
import { Card, Statistic, Row, Col, Button } from 'antd';

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
            <div class="site-statistic-demo-card">
                <Row gutter={8}>
                    <Col span={6}>
                        <Card>
                            <Statistic title = "Current Temperature" value={28} valueStyle={{ color: '#3f8600' }} prefix={<FontAwesomeIcon icon={faThermometer} />} />
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Displaytemp