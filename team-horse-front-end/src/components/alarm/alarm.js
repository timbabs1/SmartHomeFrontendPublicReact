import React from 'react';

import { Button, Row, Col, Card, Statistic, Switch } from 'antd';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell } from '@fortawesome/free-solid-svg-icons'

class Alarm extends React.Component {
    constructor(props){
        super(props);

        this.state = {
          
        }
    }

    

  render() {
    return (
        <div>
            <Row gutter={8}>
                    <Col span={6}>
                        <Card>
                            <Statistic title = "Current state" value={"On"} valueStyle={{ color: '#3f8600' }} prefix={<FontAwesomeIcon icon={faBell} />} />

                            <p className="ant-statistic-title">Switch toggle to turn alarm on or off</p>
                            <Switch  /* onChange={this.onChange} */ checkedChildren="1" unCheckedChildren="0" disabled={this.state.disabled} />
                        </Card>
                    </Col>
            </Row>
        </div>
    )
  }

}
export default Alarm