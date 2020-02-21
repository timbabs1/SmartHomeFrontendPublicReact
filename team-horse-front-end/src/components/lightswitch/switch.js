import React from 'react';
import 'antd/dist/antd.css';
import { Switch, Button } from 'antd';

class LightSwitch extends React.Component {
    constructor(props){
        super(props);

        this.state = {
          disabled: true,
        }
    }
    toggle = () => {
      this.setState({
        disabled: !this.state.disabled,
      });
    };

  render() {
    return (
      <div>
        <h1>Switch toggle for auto lights</h1>
        <Switch disabled={this.state.disabled} defaultChecked /> <br/>
        <br/>
        <Button type="primary" onClick={this.toggle}>
          Toggle disabled
        </Button>
    </div>
        
    )
  }

}
export default LightSwitch

          