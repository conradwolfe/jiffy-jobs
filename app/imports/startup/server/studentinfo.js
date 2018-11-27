import { Meteor } from 'meteor/meteor';
import { StudentInfo } from '../../api/studentinfo/studentinfo.js';

/** Initialize the database with a default data document. */
function addData(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  StudentInfo.insert(data);
}

/** Initialize the collection if empty. */
if (StudentInfo.find().count() === 0) {
  if (Meteor.settings.defaultStudentCards) {
    console.log('Creating default Students.');
    Meteor.settings.defaultStudentCards.map(data => addData(data));
  }
}

/** This subscription publishes only the documents associated with the logged in user */
Meteor.publish('StudentInfo', function publish() {
  if (this.userId) {
    // const username = Meteor.users.findOne(this.userId).username;
    return StudentInfo.find({});
  }
  return this.ready();
});
