
import React from 'react';
import { Slider, Row, Col } from 'antd';

class SliderComponent extends React.Component {
  
  onChange = value => {
    this.props.sliderHandler(value)
  };

  render() {

    return (
      <Row>
        <Col span={12}>
        <br></br>
        <h1>Brightness slider for auto lights</h1>
          <Slider
            min={1}
            max={10}
            onChange={this.onChange}
          />
        </Col>
      </Row>
    );
  }
}

export default SliderComponent