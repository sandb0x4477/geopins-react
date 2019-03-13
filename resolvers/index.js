import { GraphQLDateTime } from 'graphql-iso-date';

import userResolvers from './user';
import pinResolvers from './pin';

const customScalarResolver = {
  Date: GraphQLDateTime,
};

export default [
  customScalarResolver,
  userResolvers,
  pinResolvers,
];
