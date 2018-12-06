import React from 'react';
import { Roles } from 'meteor/alanning:roles';
import { Card, Image, Rating, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { Bert } from 'meteor/themeteorchef:bert';
import { Meteor } from 'meteor/meteor';
import { StudentInfo } from '/imports/api/studentinfo/studentinfo';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class StudentCard extends React.Component {
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
      StudentInfo.remove(this.props.studentinfo._id, this.deleteCallBack);
    }
  }

  findRating() {
    let total = 0;
    for (let i = 0; i < this.props.studentinfo.rating.length; i++) {
      total += this.props.studentinfo.rating[i];
    }
    return Math.round(total / this.props.studentinfo.rating.length);
  }

  render() {
    return (
        <Card raised color="blue">
          <Image size='small' centered src={this.props.studentinfo.image}/>
          <Card.Content>
            <Card.Header>
              <div className="landing-text-dark">
                {this.props.studentinfo.firstName} {this.props.studentinfo.lastName}
              </div>
            </Card.Header>
            <Card.Meta>
              <Rating icon='star' maxRating={5} defaultRating={this.findRating()} disabled/>
            </Card.Meta>
            <Card.Meta>
              <div className="landing-text-gray">
                Class of {this.props.studentinfo.gradyear}
              </div>
            </Card.Meta>
            <Card.Description>
              <div className="landing-text-dark">
                {this.props.studentinfo.description}
              </div>
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <Button fluid color="blue" as={Link} to={`/sprofile/${this.props.studentinfo._id}`}>
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
StudentCard.propTypes = {
  studentinfo: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(StudentCard);
