import React from 'react';
import { Grid, Image, Header, Divider, Container, Button, Segment } from 'semantic-ui-react';
import { Form } from 'semantic-ui-react/dist/commonjs/collections/Form/Form';
import { Dropdown } from 'semantic-ui-react/dist/commonjs/modules/Dropdown/Dropdown';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, NavLink } from 'react-router-dom';

/** A simple static component to render some text for the landing page. */
class CompanyProfile extends React.Component {
  render() {
    const divStyle = { paddingTop: '50px', paddingBottom: '150px' };
    return (
        <div>
          <div className="profile-page">
            <Grid container verticalAlign='left' centered columns={2}>
              <Grid.Column>
                <Container>
                  <div className="img-info">
                    <Grid container verticalAlign='center' centered rows={2}>
                      <Grid.Row>
                        <Image src="/images/company.jpg" rounded size="medium"/>
                        <a href="https://www.freepik.com/free-photos-vectors/background"></a>
                      </Grid.Row>
                      <Grid.Row>
                        <Grid container verticalAlign='left' centered columns={2}>
                          <Grid.Column>
                            <Header size="huge" as='h2' icon textAlign='left'>
                              <div className="UserFirstAndLast">
                                Rating
                              </div>
                            </Header>
                          </Grid.Column>
                      <Divider/>
                        <Grid.Column>
                          <Header size="huge" as='h2' icon textAlign='left'>
                            <div className="UserFirstAndLast">
                              Contact Information
                            </div>
                          </Header>
                        </Grid.Column>
                        </Grid>
                      </Grid.Row>
                    </Grid>
                  </div>
                </Container>
              </Grid.Column>
              <Grid.Column>
                <Container>
                    <div className="bio-stuff">
                      <Grid container verticalAlign='center' centered rows={3}>
                      <Grid.Row>
                        <div>
                          <Header size="huge" as='h2' icon textAlign='left'>
                            <div className="UserFirstAndLast">
                              COMPANY THAT DOESNT EXIST
                            </div>
                          </Header>
                        </div>
                      </Grid.Row>
                        <Divider/>
                      <Grid.Row>
                        <Header size="huge" as='h2' icon textAlign='left'>
                          <div className="UserFirstAndLast">
                            DESCRIPTION
                          </div>
                        </Header>
                      </Grid.Row>
                      <Grid.Row>
                        <p> We do a whole bunch of nothing </p>
                      </Grid.Row>
                        <Divider/>
                      <Grid.Row>
                        <Header size="huge" as='h2' icon textAlign='left'>
                          <div className="UserFirstAndLast">
                            CURRENT POSITIONS
                          </div>
                        </Header>
                      </Grid.Row>
                        <Grid.Row>
                        <p> INTERNS: unpaid position.</p>

                            <p>RECEPTIONISTS: $11.50 an hour. To do nothing.
                        </p>
                      </Grid.Row>
                      </Grid>
                    </div>
                </Container>
              </Grid.Column>
            </Grid>
          </div>
        </div>

    );
  }
}

CompanyProfile.propTypes = {
  currentUser: PropTypes.string,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
const LandingContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
}))(CompanyProfile);

export default withRouter(LandingContainer);
