import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';

/* eslint-disable no-console */
function createUser(firstname, lastname, email, password, usertype) {
  console.log(`  Creating user ${email}.`);
  const userID = Accounts.createUser({
    username: email,
    firstname: firstname,
    lastname: lastname,
    email: email,
    password: password,
  });
  if (usertype === 'admin') {
    Roles.addUsersToRoles(userID, 'admin');
  }
  if (usertype === 'student') {
    Roles.addUsersToRoles(userID, 'student');
  }
  if (usertype === 'company') {
    Roles.addUsersToRoles(userID, 'company');
  }
}
Meteor.methods({
  'serverCreateUser': function(firstname, lastname, email, password, usertype) {
    console.log(`  Creating user ${email}.`);
    const userID = Accounts.createUser({
      username: email,
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: password,
    });
    if (usertype === 'admin') {
      Roles.addUsersToRoles(userID, 'admin');
    }
    if (usertype === 'student') {
      Roles.addUsersToRoles(userID, 'student');
    }
    if (usertype === 'company') {
      Roles.addUsersToRoles(userID, 'company');
    }
  },
});
/** When running app for first time, pass a settings file to set up a default user account. */
if (Meteor.users.find().count() === 0) {
  if (Meteor.settings.defaultAccounts) {
    console.log('Creating the default user(s)');
    Meteor.settings.defaultAccounts.map(({ firstname, lastname, email, password, usertype }) => createUser(firstname, lastname, email, password, usertype));
  } else {
    console.log('Cannot initialize the database!  Please invoke meteor with a settings file.');
  }
}