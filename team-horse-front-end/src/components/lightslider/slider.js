
import React from 'react';
import { Slider, Row, Col } from 'antd';

class SliderComponent extends React.Component {
  state = {
    inputValue: 1,
  };

  onChange = value => {
    this.setState({
      inputValue: value,
    });
  };

  render() {
    const { inputValue } = this.state;

    return (
      <Row>
        <Col span={12}>
        <br></br>
        <h1>Brightness slider for auto lights</h1>
          <Slider
            min={1}
            max={10}
            onChange={this.onChange}
            onAfterChange={() => this.props.sliderHandler(this.state.inputValue)}
            value={typeof inputValue === 'number' ? inputValue : 0}
          />
        </Col>
      </Row>
    );
  }
}

export default SliderComponent