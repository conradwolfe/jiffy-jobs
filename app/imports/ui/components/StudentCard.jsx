import React from 'react';
import { Card, Image, Rating, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class StudentCard extends React.Component {
    render() {
        return (
            <Card raised color="blue">
                <Image size='small' centered src={this.props.studentinfo.image}/>
                <Card.Content>
                    <Card.Header>
                        <div className = "landing-text-dark">
                            {this.props.studentinfo.firstName} {this.props.studentinfo.lastName}
                        </div>
                    </Card.Header>
                    <Card.Meta>
                        <Rating icon='star' defaultRating={5} maxRating={5}></Rating>
                    </Card.Meta>
                    <Card.Meta>
                        <div className = "landing-text-gray">
                            Class of {this.props.studentinfo.gradyear}
                        </div>
                    </Card.Meta>
                    <Card.Description>
                        <div className = "landing-text-dark">
                            {this.props.studentinfo.description}
                        </div>
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <Button fluid color="blue" as={ Link } to={`/edit/${this.props.studentinfo._id}`}>
                        <div className = "landing-text">
                            Visit Profile
                        </div>
                    </Button>
                </Card.Content>
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