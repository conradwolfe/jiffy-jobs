import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Card, Header, Loader, Divider, Menu } from 'semantic-ui-react';
import { StudentInfo } from '/imports/api/studentinfo/studentinfo';
import StudentCard from '/imports/ui/components/StudentCard';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class StudentSearch extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Discovering Students</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    const spacing = {
      paddingTop: '30px',
      paddingBottom: '30px',
      paddingLeft: '10px',
    };
    const divStyle = { paddingTop: '50px', paddingBottom: '250px' };
    return (
        <div>
          <div>
            <Menu text>
              <Menu.Item>
                <Header as="h1" textAlign="center" inverted>
                  <div className="landing-text-dark" style={spacing}>
                    Student Search
                  </div>
                </Header>
              </Menu.Item>
            </Menu>
          </div>
          <div className="dashboard-background">
            <Container>
              <Card.Group centered itemsPerRow={4}>
                {this.props.studentinfo.map((studentinfo, index) => <StudentCard key={index}
                                                                                 studentinfo={studentinfo}/>)}
              </Card.Group>
            </Container>
          </div>
          <div className="dashboard-background">
            <footer>
              <div style={divStyle} className="ui center aligned container">
                <Divider/>
                <div className="login-font">
                  Department of Information and Computer Sciences <br/>
                  University of Hawaii<br/>
                  Honolulu, HI 96822
                </div>
              </div>
            </footer>
          </div>
        </div>
    );
  }
}

/** Require an array of Stuff documents in the props. */
StudentSearch.propTypes = {
  studentinfo: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('StudentInfo');
  return {
    studentinfo: StudentInfo.find({}).fetch(),
    ready: subscription.ready(),
  };
})(StudentSearch);
