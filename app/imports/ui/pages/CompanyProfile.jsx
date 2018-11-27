import React from 'react';
import { Grid, Image, Header, Divider, Container, List } from 'semantic-ui-react';
import { Form } from 'semantic-ui-react/dist/commonjs/collections/Form/Form';
import { Dropdown } from 'semantic-ui-react/dist/commonjs/modules/Dropdown/Dropdown';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, NavLink } from 'react-router-dom';
import { CompanyInfo } from '/imports/api/companyinfo/companyinfo';

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
                        <Image src={this.props.companyinfo._id === Meteor.userId ? (this.props.companyinfo.image) : '/images/company.jpg'} rounded size="medium"/>
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
                          <List>
                            <List.Item>
                              <List.Icon name='mail'/>
                              <List.Content>
                                {this.props.companyinfo._id === Meteor.userId ? (this.props.companyinfo.email) : ''}
                              </List.Content>
                            </List.Item>

                            <List.Item>
                              <List.Icon name="globe" />
                              <List.Content>
                                {this.props.companyinfo._id === Meteor.userId ? (this.props.companyinfo.website) : ''}
                              </List.Content>
                            </List.Item>
                          </List>
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
                              {this.props.companyinfo._id === Meteor.userId() ? (this.props.companyinfo.companyName) : ''}
                            </div>
                          </Header>
                        </div>
                      </Grid.Row>
                        <Divider/>
                      <Grid.Row>
                        <Header size="huge" as='h2' icon textAlign='left'>
                          <div className="UserFirstAndLast">
                            About Us
                          </div>
                        </Header>
                      </Grid.Row>
                      <Grid.Row>
                        <p> {this.props.companyinfo._id === Meteor.userId() ? (this.props.companyinfo.description) : ''} </p>
                      </Grid.Row>
                        <Divider/>
                      <Grid.Row>
                        <Header size="huge" as='h2' icon textAlign='left'>
                          <div className="UserFirstAndLast">
                            Current Positions
                          </div>
                        </Header>
                      </Grid.Row>
                        <Grid.Row>
                        <p> {this.props.companyinfo._id === Meteor.userId ? (this.props.companyinfo.positions) : 'No positions available'}</p>
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
  companyinfo: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('CompanyInfo');
  return {
    companyinfo: CompanyInfo.find({}).fetch(),
    ready: subscription.ready(),
  };

})(CompanyProfile);
