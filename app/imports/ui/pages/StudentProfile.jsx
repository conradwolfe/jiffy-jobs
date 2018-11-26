import React from 'react';
import { Grid, Image, Header, Divider, Container, Button, Segment } from 'semantic-ui-react';
import { Form } from 'semantic-ui-react/dist/commonjs/collections/Form/Form';
import { Dropdown } from 'semantic-ui-react/dist/commonjs/modules/Dropdown/Dropdown';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, NavLink } from 'react-router-dom';

/** A simple static component to render some text for the landing page. */
class StudentProfile extends React.Component {
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
                        <Image src="/images/computer.jpg" rounded size="medium"/>
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
                              USER FIRST AND LAST NAME
                            </div>
                          </Header>
                        </div>
                      </Grid.Row>
                        <Divider/>
                      <Grid.Row>
                        <Header size="huge" as='h2' icon textAlign='left'>
                          <div className="UserFirstAndLast">
                            BIO
                          </div>
                        </Header>
                        <p> Lorem ipsum dolor sit amet, vim zril dicant ad, iriure sapientem concludaturque an ius, mei legendos accommodare cu. Quo id ponderum tincidunt. Per eu minim oratio. Nostro nominavi ne nam, his no scripta ceteros. Nibh verear fierent eum in, pro eu dicunt sadipscing signiferumque. Usu hinc officiis suscipiantur in, ius amet movet recusabo ei, cu purto persecuti duo.</p>
                      </Grid.Row>
                        <Divider/>
                      <Grid.Row>
                        <Header size="huge" as='h2' icon textAlign='left'>
                          <div className="UserFirstAndLast">
                            Interests
                          </div>
                        </Header>
                        <p> Affert iudico oblique ea vim. Pri an fierent principes, perfecto definitionem an has, in cibo accusam sit. Eam doming putent ei. No alii populo vituperatoribus duo, est mentitum voluptua ex, veri aliquip prompta sit ei. Mei brute dicam scripta eu, nisl oportere cu pro.

                          Duo ex graeco mediocrem consequuntur, eos adhuc nostrud fuisset at. Fierent abhorreant ea sit. Te nec sint audiam concludaturque, cu quod aeterno torquatos eam. Cum dolore ignota conceptam ex, vim ne urbanitas comprehensam necessitatibus. Nam graeci consequuntur ut, congue iudicabit nam ad. Cum te purto dicat fuisset, cum te audiam prodesset comprehensam.
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

StudentProfile.propTypes = {
  currentUser: PropTypes.string,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
const LandingContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
}))(StudentProfile);

export default withRouter(LandingContainer);
