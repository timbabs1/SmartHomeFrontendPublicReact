
import React from 'react';
import { Slider, Row, Col, Select } from 'antd';
const { Option } = Select;

class SliderComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      roomName: 'Bedroom'
    }
  }

  onChange = (value) => {
    this.props.sliderHandler(value, this.state.roomName)
  };

  render() {

    return (
      <Row>
        <Col span={12}>
          <br></br>
          <h1>Brightness slider for auto lights</h1>
          <Select defaultValue="Bedroom" style={{ width: 120 }} onSelect={(value) => this.setState({roomName : value})}>
            <Option value="Bedroom">Bedroom</Option>
            <Option value="Kitchen">Kitchen</Option>
            <Option value="Bathroom">Bathroom</Option>
          </Select>

          <Slider
            min={0}
            max={9}
            onChange={this.onChange}
          />
        </Col>
      </Row>
    );
  }
}

export default SliderComponent