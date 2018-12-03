import React from 'react';
import { Grid, Loader, Header, Segment} from 'semantic-ui-react';
import { CompanyInfo, CompanySchema } from '/imports/api/companyinfo/companyinfo';
import { Bert } from 'meteor/themeteorchef:bert';
import AutoForm from 'uniforms-semantic/AutoForm';
import TextField from 'uniforms-semantic/TextField';
import LongTextField from 'uniforms-semantic/LongTextField';
import SelectField from 'uniforms-semantic/SelectField';
import SubmitField from 'uniforms-semantic/SubmitField';
import HiddenField from 'uniforms-semantic/HiddenField';
import ErrorsField from 'uniforms-semantic/ErrorsField';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

/** Renders the Page for editing a single document. */
class EditProfile extends React.Component {

  /** On successful submit, insert the data. */
  submit(data) {
    const { companyName, location, description, image, _id } = data;
    CompanyInfo.update(_id, { $set: { companyName, location, description, image } }, (error) => (error ?
        Bert.alert({ type: 'danger', message: `Update failed: ${error.message}` }) :
        Bert.alert({ type: 'success', message: 'Update succeeded' })));
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  renderPage() {
    return (
        <Grid container centered>
          <Grid.Row>
            <Header as="h1" textAlign="center">Edit Your Profile</Header>
          </Grid.Row>
          <AutoForm schema={CompanySchema} onSubmit={this.submit} model={this.props.doc}>
            <Grid container centered>
              <Grid.Row>
                <Grid.Column width={6}>
                  <TextField name='companyName'/>
                </Grid.Column>
                <Grid.Column width={6}>
                  <TextField name='location'/>
                </Grid.Column>
              </Grid.Row>

              <Grid.Row>
                <Grid.Column width={12}>
                  <TextField name='image'/>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={10}>
                  <LongTextField name='description'/>
                </Grid.Column>
              </Grid.Row>

              <Grid.Row>
                <SubmitField value='Submit' className='blue fluid'/>
              </Grid.Row>
              <ErrorsField/>
              <HiddenField name='owner' />
            </Grid>
          </AutoForm>
        </Grid>
    );
  }
}

/** Require the presence of a Stuff document in the props object. Uniforms adds 'model' to the props, which we use. */
EditProfile.propTypes = {
  doc: PropTypes.object,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('CompanyInfo');
  return {
    doc: CompanyInfo.findOne(documentId),
    ready: subscription.ready(),
  };
})(EditProfile);