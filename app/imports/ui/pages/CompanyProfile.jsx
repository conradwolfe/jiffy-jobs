import React from 'react';
import { Grid, Image, Header, Divider, Loader, List, Icon, Segment, Button, Label } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { CompanyInfo } from '/imports/api/companyinfo/companyinfo';

/** A simple static component to render some text for the profile page. */
class CompanyProfile extends React.Component {
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Loading Profile</Loader>;
  }

  renderPage() {
    // const divStyle = {paddingTop: '50px', paddingBottom: '150px'};
    return (
        <div>
          <div className="profile-page">
            <Grid>
                <Grid.Column width={4} className='profile-column' >
                <Segment>
                <Grid.Row>
                  <Image rounded size='medium'
                         src={this.props.data.image}/>
                </Grid.Row>
                  <Divider hidden />
                  <Grid.Row>
                    <div>
                    <Icon name='location arrow' color='blue' />
                    {this.props.data.location}
                    </div>
                <Divider hidden />
                  </Grid.Row>
                <Divider hidden />
                <Grid.Row>
                  <Header size="huge" as='h2'>
                    <div className="landing-text-dark">
                      Contact Information
                    </div>
                  </Header>
                  <List>
                    <List.Item>
                      <List.Icon name='mail' color='blue' />
                      <List.Content>john@foo.com</List.Content>
                    </List.Item>

                    <List.Item>
                      <List.Icon name='globe' color='blue' />
                      <List.Content>website</List.Content>
                    </List.Item>

                    <List.Item>
                      <List.Icon name='phone' color='blue' />
                      <List.Content>(123)-456-7890</List.Content>
                    </List.Item>
                  </List>
                </Grid.Row>
                <Divider hidden />
                <Grid.Row>
                  <Button as='div' labelPosition='right'>
                    <Button basic color='blue'>
                      <Icon name='add' />
                    </Button>
                    <Label as='a' basic color='blue' pointing='left'>
                      Add to List
                    </Label>
                  </Button>
                </Grid.Row>
                </Segment>
              </Grid.Column>
              <Grid.Column width='8' className="profile-column">
                <Segment className="bio-stuff">
                  <Grid.Row>
                    <div>
                      <Header size="huge" as='h2' icon>
                        <div className="landing-text-dark">
                          {this.props.data.companyName}
                        </div>
                      </Header>
                    </div>
                  </Grid.Row>
                  <Divider/>
                  <Grid.Row>
                    <Header size="huge" as='h1' icon>
                      <div className="landing-text-dark">
                        About Me
                      </div>
                    </Header>
                    <p> {this.props.data.description} </p>
                  </Grid.Row>
                  <Divider/>
                  <Grid.Row>
                    <Header size="huge" as='h2' icon>
                      <div className="landing-text-dark">
                        Interests
                      </div>
                    </Header>
                    <p> Affert iudico oblique ea vim. Pri an fierent principes, perfecto definitionem an
                      has, in cibo accusam sit. Eam doming putent ei. No alii populo vituperatoribus
                      duo, est mentitum voluptua ex, veri aliquip prompta sit ei. Mei brute dicam
                      scripta eu, nisl oportere cu pro.
                      Duo ex graeco mediocrem consequuntur, eos adhuc nostrud fuisset at. Fierent
                      abhorreant ea sit. Te nec sint audiam concludaturque, cu quod aeterno torquatos
                      eam. Cum dolore ignota conceptam ex, vim ne urbanitas comprehensam
                      necessitatibus. Nam graeci consequuntur ut, congue iudicabit nam ad. Cum te
                      purto dicat fuisset, cum te audiam prodesset comprehensam.
                    </p>
                  </Grid.Row>
                </Segment>
              </Grid.Column>
              <Grid.Column width="3" className="profile-column">
                <Segment circular size="huge" color='blue'>
                  <Header as='h2'>Rating</Header>
                  <Header as='h3'>94%</Header>
                </Segment>
              </Grid.Column>
            </Grid>
          </div>
        </div>

    );
  }
}

CompanyProfile.propTypes = {
  data: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(({ match }) => {
  const documentId = match.params._id;
  const subscription = Meteor.subscribe('CompanyInfo');
  const comp = CompanyInfo.findOne(documentId);
  return {
    data: comp,
    ready: subscription.ready(),
  };
})(CompanyProfile);
