import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
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

/** This subscription publishes all documents regardless of user */
Meteor.publish('StudentInfo', function publish() {
  if (this.userId) {

    return StudentInfo.find({});
  }
  return this.ready();
});

/** This subscription publishes all documents owned by a specific student. */
Meteor.publish('StudentProfileInfo', function publish() {
  const username = Meteor.users.findOne(this.userId).username;
  if (this.userId && Roles.userIsInRole(this.userId, 'student')) {
    return StudentInfo.find({ owner: username });
  }
  return this.ready();
});
