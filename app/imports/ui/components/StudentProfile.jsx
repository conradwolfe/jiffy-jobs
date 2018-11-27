import React from 'react';
import { Grid, Image, Header, Divider, Container, Button } from 'semantic-ui-react';
import { Form } from 'semantic-ui-react/dist/commonjs/collections/Form/Form';
import { Dropdown } from 'semantic-ui-react/dist/commonjs/modules/Dropdown/Dropdown';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, NavLink } from 'react-router-dom';
import { CompanyInfo } from '/imports/api/companyinfo/companyinfo';

/** A simple static component to render some text for the profile page. */
class StudentProfile extends React.Component {

  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.deleteCallback = this.deleteCallback.bind(this);
  }

  render() {
    const divStyle = {paddingTop: '50px', paddingBottom: '150px'};
    return (
        <div>
          <div className="profile-page">
            <Grid container verticalAlign='middle' centered columns={2}>
              <Grid.Column verticalAlign='left'>
                <Grid.Row>
                  <Image size='medium' left
                         src={"https://react.semantic-ui.com/images/avatar/large/matthew.png"}/>
                </Grid.Row>
                <Grid.Row>
                  <Header size="huge" as='h2' icon textAlign='left'>
                    <div className="UserFirstAndLast">
                      Rating
                    </div>
                  </Header>
                </Grid.Row>
                <Grid.Row>
                  <p>
                    94%
                  </p>
                </Grid.Row>
                <Grid.Row>
                  <Header size="huge" as='h2' icon textAlign='left'>
                    <div className="UserFirstAndLast">
                      Contact Information
                    </div>
                  </Header>
                </Grid.Row>
              </Grid.Column>
              <Grid.Column verticalAlign='right'>
                <div className="bio-stuff">
                  <Grid.Row>
                    <div>
                      <Header size="huge" as='h2' icon textAlign='center'>
                        <div className="UserFirstAndLast">
                          {this.props.firstname}
                        </div>
                      </Header>
                    </div>
                  </Grid.Row>
                  <Divider/>
                  <Grid.Row>
                    <Header size="huge" as='h2' icon textAlign='center'>
                      <div className="UserFirstAndLast">
                        BIO
                      </div>
                    </Header>
                    <p> {this.props.description}</p>
                  </Grid.Row>
                  <Divider/>
                  <Grid.Row>
                    <Header size="huge" as='h2' icon textAlign='center'>
                      <div className="UserFirstAndLast">
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
                </div>
              </Grid.Column>
            </Grid>
          </div>
        </div>

    );
  }
}

StudentProfile.propTypes = {
  companyinfo: PropTypes.object.isRequired,
  currentUser: PropTypes.string,
};

export default withRouter(StudentProfile);
