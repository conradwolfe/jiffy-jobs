import { Meteor } from 'meteor/meteor';
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

/** This subscription publishes only the documents associated with the logged in user */
Meteor.publish('CompanyInfo', function publish() {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return CompanyInfo.find({ owner: username });
  }
  return this.ready();
});
