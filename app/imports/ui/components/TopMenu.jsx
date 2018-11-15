import React from 'react';
import { Container, Menu, Dropdown, Icon, Image } from 'semantic-ui-react';

export default class TopMenu extends React.Component {
  render() {
    return (
        <Menu borderless>
          <Container>
            <Menu.Item fitted><Image src="/images/jiffylogo.png" rounded size="small"/></Menu.Item>
            <Menu.Item fitted position ="right"><Icon size="big" name="user circle"/></Menu.Item>
            <Menu.Item fitted ><Icon size="big" name="home"/></Menu.Item>
            <Menu.Item fitted ><Icon size="big" name="suitcase"/></Menu.Item>
            <Menu.Item fitted ><Icon size="big" name="search"/></Menu.Item>
          </Container>
        </Menu>
    );
  }
}
