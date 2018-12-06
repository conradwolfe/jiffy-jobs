import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';
import { Index, MinimongoEngine } from 'meteor/easy:search';


/** Create a Meteor collection. */
const StudentInfo = new Mongo.Collection('StudentInfo');

/** Create a schema to constrain the structure of documents associated with this collection. */
const StudentSchema = new SimpleSchema({
    firstName: String,
    lastName: String,
    gradyear: String,
    description: String,
    image: String,
    rating: [Number],
    interests: String,
    phone: String,
    website: String,
    owner: String,
}, { tracker: Tracker });

/** Attach this schema to the collection. */
StudentInfo.attachSchema(StudentSchema);

const StudentIndex = new Index({
  collection: StudentInfo,
  fields: ['companyName'],
  engine: new MinimongoEngine(),
});

/** Make the collection and schema available to other code. */
export { StudentInfo, StudentSchema, StudentIndex };
