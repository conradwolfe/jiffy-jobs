import React from 'react';
import { Divider } from 'semantic-ui-react';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class Footer extends React.Component {
  render() {
    const divStyle = { paddingTop: '50px', paddingBottom: '250px' };
    return (
        <div className = "signin-background">
          <footer>
            <div style={divStyle} className="ui center aligned container">
              <Divider />
              <div className = "login-font">
                Department of Information and Computer Sciences <br />
                University of Hawaii<br />
                Honolulu, HI 96822
              </div>
            </div>
          </footer>
        </div>
    );
  }
}

export default Footer;
