import { Button } from 'antd';
class Tempbutton extends React.Component {
    constructor(props){
        super(props);

        this.state = {
          
        }
    }

    

  render() {
    return (
        <div>
        <Button type="primary">Day</Button>
        <Button type="primary">Night</Button>
        </div>
    )
  }

}
export default LightSwitch