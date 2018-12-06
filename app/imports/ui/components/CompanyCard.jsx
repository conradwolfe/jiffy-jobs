import React from 'react';
import { Roles } from 'meteor/alanning:roles';
import { Card, Image, Button, Rating } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { Bert } from 'meteor/themeteorchef:bert';
import { Meteor } from 'meteor/meteor';
import { CompanyInfo } from '/imports/api/companyinfo/companyinfo';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class CompanyCard extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.deleteCallback = this.deleteCallback.bind(this);
    this.findRating = this.findRating.bind(this);
  }

  deleteCallback(error) {
    if (error) {
      Bert.alert({ type: 'danger', message: `Delete failed: ${error.message}` });
    } else {
      Bert.alert({ type: 'success', message: 'Delete succeeded' });
    }
  }

  onClick() {
    /* eslint-disable-next-line */
    if (confirm("Do you really want to remove this card?")) {
      CompanyInfo.remove(this.props.companyinfo._id, this.deleteCallBack);
    }
  }

  findRating() {
    let total = 0;
    for (let i = 0; i < this.props.companyinfo.rating.length; i++) {
      total += this.props.companyinfo.rating[i];
    }
    return Math.round(total / this.props.companyinfo.rating.length);
  }

  render() {
    return (
        <Card raised color="blue">
          <Image size='small' centered src={this.props.companyinfo.image}/>
          <Card.Content>
            <Card.Header>
              <div className="landing-text-dark">
                {this.props.companyinfo.companyName}
              </div>
            </Card.Header>
            <Card.Meta>
              <Rating icon='star' maxRating={5} defaultRating={this.findRating()} disabled/>
            </Card.Meta>
            <Card.Meta>
              <div className="landing-text-gray">
                {this.props.companyinfo.location}
              </div>
            </Card.Meta>
            <Card.Description>
              <div className="landing-text-dark">
                {this.props.companyinfo.description}
              </div>
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <Button fluid color="blue" as={Link} to={`/cprofile/${this.props.companyinfo._id}`}>
              <div className="landing-text">
                Visit Profile
              </div>
            </Button>
          </Card.Content>
          {(Roles.userIsInRole(Meteor.userId(), 'admin')) ? (
              <Card.Content extra>
                <Button fluid color="red" onClick={this.onClick}>
                  Delete Profile
                </Button>
              </Card.Content>
          ) : ''}
        </Card>
    );
  }
}

/** Require a document to be passed to this component. */
CompanyCard.propTypes = {
  companyinfo: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(CompanyCard);
