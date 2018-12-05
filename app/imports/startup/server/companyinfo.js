import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { CompanyInfo } from '../../api/companyinfo/companyinfo.js';

/** Initialize the database with a default data document. */
function addData(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  CompanyInfo.insert(data);
}

/** Initialize the collection if empty. */
if (CompanyInfo.find().count() === 0) {
  if (Meteor.settings.defaultCompanyCards) {
    console.log('Creating default companies.');
    Meteor.settings.defaultCompanyCards.map(data => addData(data));
  }
}

/** This subscription publishes all documents regardless of user */
Meteor.publish('CompanyInfo', function publish() {
  if (this.userId) {
    return CompanyInfo.find({});
  }
  return this.ready();
});

/** This subscription publishes all documents owned by a specific company. */
Meteor.publish('CompanyProfileInfo', function publish() {
  const username = Meteor.users.findOne(this.userId).username;
  if (this.userId && Roles.userIsInRole(this.userId, 'company')) {
    return CompanyInfo.find({ owner: username });
  }
  return this.ready();
});
