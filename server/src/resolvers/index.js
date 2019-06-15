import { GraphQLDateTime } from 'graphql-iso-date';

import userResolvers from './user';
import pinResolvers from './pin';
import commentResolvers from './comment';

const customScalarResolver = {
  Date: GraphQLDateTime,
};

export default [customScalarResolver, userResolvers, pinResolvers, commentResolvers];
