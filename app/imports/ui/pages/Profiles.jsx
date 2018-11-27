import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Card, Header, Loader } from 'semantic-ui-react';
import StudentProfile from '/imports/ui/components/StudentProfile';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { CompanyInfo } from '/imports/api/companyinfo/companyinfo';
import { StudentInfo } from '../../api/studentinfo/studentinfo';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class Profiles extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Opening Profile</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <div>
          <div>
            <Container>
                {this.props.companyinfo.map((studentinfo, index) => <StudentProfile key={index} studentinfo={StudentInfo}/>)}
            </Container>
          </div>
          <StudentProfile/>
        </div>
    );
  }
}

/** Require an array of Stuff documents in the props. */
Profiles.propTypes = {
  companyinfo: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('StudentProfile');
  return {
    companyinfo: CompanyInfo.find({}).fetch(),
    ready: subscription.ready(),
  };
})(Profiles);
