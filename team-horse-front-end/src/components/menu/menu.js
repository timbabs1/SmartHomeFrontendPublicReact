import React from 'react';
import 'antd/dist/antd.css';
import { Menu, Icon } from 'antd';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell } from '@fortawesome/free-solid-svg-icons'

import { WarningOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;

class Nav extends React.Component {
  state = {
    current: "lights",
  };

  handleChange() {
  }

  handleClick = e => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
    this.props.changeView({
      currentMenu: this.state.current,
    })
    console.log(this.state.current)

  };

  render() {
    return (
      <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
        <Menu.Item key="lights">
          <Icon type="bulb" />
          Auto lights
        </Menu.Item>
        <Menu.Item key="temperature">
          <Icon type="heat-map" />
          Temperature
        </Menu.Item>
        <Menu.Item key="alarm">
        <WarningOutlined />
          Alarm
        </Menu.Item>
        <Menu.Item key="alipay">
          <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
          <Icon type="windows" />
            Windows
          </a>
        </Menu.Item>
      </Menu>
    );
  }
}

export default Nav;