import React from 'react';
import { Grid, Image, Header, List, Divider, Button, Loader, Segment, Icon, Label, Rating } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import { withTracker } from 'meteor/react-meteor-data';
import { StudentInfo } from '/imports/api/studentinfo/studentinfo';

/** A simple static component to render some text for the profile page. */
class StudentProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.rateCallback = this.rateCallback.bind(this);
    this.findRating = this.findRating.bind(this);
  }

  handleRate = (e, { rating }) => (this.setState({ rating }, this.rateCallback(rating)));

  findRating() {
    let total = 0;
    for (let i = 0; i < this.props.data.rating.length; i++) {
      console.log(this.props.data.rating[i]);
      total += this.props.data.rating[i];
    }
    const avg = (total / this.props.data.rating.length);
    return Math.round(avg);
  }

  rateCallback(rating) {
    // this.props.data.rating.push(rating);
    StudentInfo.update(this.props.data._id, { $push: { rating } }, (error) => (error ?
        Bert.alert({ type: 'danger', message: `Review failed: ${error.message}` }) :
        Bert.alert({ type: 'success', message: 'Thank you for your review!' })));
  }

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Loading Profile</Loader>;
  }

  renderPage() {
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
                      <Icon name='graduation cap' color='blue' />
                      {this.props.data.gradyear}
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
                        <List.Content>{this.props.data.owner}</List.Content>
                      </List.Item>

                      <List.Item>
                        <List.Icon name='globe' color='blue' />
                        <List.Content>{this.props.data.website}</List.Content>
                      </List.Item>

                      <List.Item>
                        <List.Icon name='phone' color='blue' />
                        <List.Content>{this.props.data.phone}</List.Content>
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
                          {this.props.data.firstName} {this.props.data.lastName}
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
                    <p> {this.props.data.interests}
                    </p>
                  </Grid.Row>
                  {this.props.currentUser === this.props.data.owner ? (
                      '') : (
                      <div>
                        <Divider/>
                        <Grid.Row>
                          <Header size="huge" as='h2' icon>
                            <div className="landing-text-dark">
                              Leave a Rating!
                            </div>
                          </Header>
                        </Grid.Row>
                        <Grid.Row>
                          <Rating icon='star' maxRating={5} onRate={this.handleRate}/>
                        </Grid.Row>
                      </div>
                  )}
                </Segment>
              </Grid.Column>
              <Grid.Column width="3" className="profile-column">
                <Segment circular size="huge" color='blue'>
                  <Header as='h2'>Rating</Header>
                  <Header as='h3'>
                    {this.findRating()}
                  </Header>
                </Segment>
              </Grid.Column>
            </Grid>
          </div>
        </div>

    );
  }
}

StudentProfile.propTypes = {
  data: PropTypes.object,
  currentUser: PropTypes.string,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(({ match }) => {
  const documentId = match.params._id;
  const subscription = Meteor.subscribe('StudentInfo');
  const stud = StudentInfo.findOne(documentId);
  return {
    data: stud,
    currentUser: Meteor.user() ? Meteor.user().username : '',
    ready: subscription.ready(),
  };
})(StudentProfile);
