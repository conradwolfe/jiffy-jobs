import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';
import { Index, MinimongoEngine } from 'meteor/easy:search';

/** Create a Meteor collection. */
const CompanyInfo = new Mongo.Collection('CompanyInfo');

/** Create a schema to constrain the structure of documents associated with this collection. */
const CompanySchema = new SimpleSchema({
    companyName: String,
    location: String,
    description: String,
    image: String,
    rating: [Number],
    interests: String,
    phone: String,
    website: String,
    owner: String,
}, { tracker: Tracker });

/** Attach this schema to the collection. */
CompanyInfo.attachSchema(CompanySchema);

const CompanyIndex = new Index({
  collection: CompanyInfo,
  fields: ['companyName'],
  engine: new MinimongoEngine(),
});

/** Make the collection and schema available to other code. */
export { CompanyInfo, CompanySchema, CompanyIndex };
