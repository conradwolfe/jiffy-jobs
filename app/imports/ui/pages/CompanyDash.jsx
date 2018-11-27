import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Card, Header, Loader } from 'semantic-ui-react';
import { CompanyInfo } from '/imports/api/companyinfo/companyinfo';
import CompanyCard from '/imports/ui/components/CompanyCard';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class CompanyDash extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Discovering Companies</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <div>
          <div className="landing-background">
            <Container>
              <div className = "landing-font">
                <Header as="h2" textAlign="center" inverted>List Companies</Header>
                <Card.Group centered>
                  {this.props.companyinfo.map((companyinfo, index) => <CompanyCard key={index}
                                                                        companyinfo={companyinfo}/>)}
                </Card.Group>
              </div>
            </Container>
          </div>
        </div>
    );
  }
}

/** Require an array of Stuff documents in the props. */
CompanyDash.propTypes = {
  companyinfo: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Company');
  return {
    companyinfo: CompanyInfo.find({}).fetch(),
    ready: subscription.ready(),
  };
})(CompanyDash);
