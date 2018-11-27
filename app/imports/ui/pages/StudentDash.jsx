import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Card, Header, Loader } from 'semantic-ui-react';
import { CompanyInfo } from '/imports/api/companyinfo/companyinfo';
import StudentCard from '/imports/ui/components/StudentCard';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class StudentDash extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Discovering Students</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <div>
          <div className="landing-background">
            <Container>
              <div className = "landing-font">
                <Header as="h2" textAlign="center" inverted>List Students</Header>
                <Card.Group centered>
                  {this.props.studentinfo.map((studentinfo, index) => <StudentCard key={index}
                                                                                   studentinfo={studentinfo}/>)}
                </Card.Group>
              </div>
            </Container>
          </div>
        </div>
    );
  }
}

/** Require an array of Stuff documents in the props. */
StudentDash.propTypes = {
  studentinfo: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('CompanyInfo');
  return {
    studentinfo: StudentInfo.find({}).fetch(),
    ready: subscription.ready(),
  };
})(StudentDash);
