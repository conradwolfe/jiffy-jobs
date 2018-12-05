import React from 'react';
import { Grid, Loader, Header, Image} from 'semantic-ui-react';
import { CompanyInfo, CompanySchema } from '/imports/api/companyinfo/companyinfo';
import { Bert } from 'meteor/themeteorchef:bert';
import AutoForm from 'uniforms-semantic/AutoForm';
import TextField from 'uniforms-semantic/TextField';
import LongTextField from 'uniforms-semantic/LongTextField';
import SubmitField from 'uniforms-semantic/SubmitField';
import HiddenField from 'uniforms-semantic/HiddenField';
import ErrorsField from 'uniforms-semantic/ErrorsField';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

/** Renders the Page for editing a single document. */
class EditCompany extends React.Component {

  /** On successful submit, insert the data. */
  submit(data) {
    const { companyName, location, description, image, interests, website, phone, _id } = data;
    CompanyInfo.update(_id, { $set: { companyName, location, description, image, interests, website, phone } }, (error) => (error ?
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
        <div className='profile-page'>
          <Grid container centered className='profile-page'>
            <Grid.Row>
              <Header as="h1" textAlign="center">Edit Your Profile</Header>
            </Grid.Row>
            <AutoForm schema={CompanySchema} onSubmit={this.submit} model={this.props.doc}>
              <Grid container centered>
                <Grid.Row>
                  <Grid.Column width={8}>
                    <TextField name='companyName' type='dark-text'/>
                  </Grid.Column>
                  <Grid.Column width={8}>
                    <TextField name='location' type='dark-text'/>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column width={8}>
                    <TextField name='phone' type='dark-text' />
                  </Grid.Column>
                  <Grid.Column width={8}>
                    <TextField name='website' type='dark-text'/>
                  </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                  <Grid.Column width={2}>
                    <Image src={this.props.doc.image} size='tiny' />
                  </Grid.Column>
                  <Grid.Column width={14}>
                    <TextField name='image' type="dark-text"/>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column width={8}>
                    <LongTextField name='description' type="dark-text"/>
                  </Grid.Column>
                  <Grid.Column width={8}>
                    <LongTextField name='interests' type='dark-text'/>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <SubmitField value='Submit' className='inverted'  />
                </Grid.Row>
                <Grid.Row>
                  <ErrorsField/>
                  <HiddenField name='owner' />
                </Grid.Row>
              </Grid>
            </AutoForm>
          </Grid>
        </div>
    );
  }
}

/** Require the presence of a Stuff document in the props object. Uniforms adds 'model' to the props, which we use. */
EditCompany.propTypes = {
  doc: PropTypes.array.isRequired,
  model: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {

  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('CompanyInfo');
  return {
    doc: CompanyInfo.find({}).fetch()[0],
    ready: subscription.ready(),
  };
})(EditCompany);