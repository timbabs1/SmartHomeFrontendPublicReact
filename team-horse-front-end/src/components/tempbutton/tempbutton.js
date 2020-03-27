import React from 'react';

import { Button, Row, Col, Card } from 'antd';

class Tempbutton extends React.Component {
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
                          <Button type="primary">Day</Button>
                        </Card>
                    </Col>
                    <Col span={6}>
                      <Card>
                        <Button type="default">Night</Button>
                      </Card>
                    </Col>
          </Row>
        </div>
    )
  }

}
export default Tempbutton