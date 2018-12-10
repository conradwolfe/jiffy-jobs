import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';
import { StudentInfo } from '/imports/api/studentinfo/studentinfo';
import { CompanyInfo } from '/imports/api/companyinfo/companyinfo';

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
  'serverCreateUser': function (firstname, lastname, email, password, usertype) {
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
      const owner = email;
      const desc = 'Fill me in';
      const grdyr = 2000;
      const img = 'https://images.homedepot-static.com/productImages/af68091e-a496-426c-858e-20ea60e01f02/svn/ge-pre-lit-christmas-trees-17167hd-64_1000.jpg';
      const rating = [];
      const inter = 'fill me in';
      const phonenum = '000-000-0000';
      const webs = 'something.com';
      StudentInfo.insert({
        firstName: firstname,
        lastName: lastname,
        gradyear: grdyr,
        email: email,
        description: desc,
        image: img,
        interests: inter,
        rating: rating,
        phone: phonenum,
        website: webs,
        owner: owner
      });
    }
    if (usertype === 'company') {
      Roles.addUsersToRoles(userID, 'company');
      const compName = 'Placeholder';
      const loc = 'Somewhere';
      const owner = email;
      const desc = 'fill me in';
      const img = 'https://images.homedepot-static.com/productImages/af68091e-a496-426c-858e-20ea60e01f02/svn/ge-pre-lit-christmas-trees-17167hd-64_1000.jpg';
      const inter = 'fill me in';
      const rating = [];
      const phonenum = '000-000-0000';
      const webs = 'something.com';
      CompanyInfo.insert({
        companyName: compName,
        location: loc,
        description: desc,
        image: img,
        rating: rating,
        interests: inter,
        phone: phonenum,
        website: webs,
        owner: owner
      });
    }
    Meteor.publish(userID);
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
