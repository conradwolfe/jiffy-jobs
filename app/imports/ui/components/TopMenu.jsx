import React from 'react';
import { Container, Menu, Dropdown } from 'semantic-ui-react';

export default class TopMenu extends React.Component {
  render() {
    return (
        <Menu borderless className="topmenu">
          <Container>
          <Dropdown item text='Categories'>
            <Dropdown.Menu>
              <Dropdown.Item>Electronics</Dropdown.Item>
              <Dropdown.Item>Automotive</Dropdown.Item>
              <Dropdown.Item>Home</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          </Container>
        </Menu>
    );
  }
}
