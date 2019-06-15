import { gql } from 'apollo-server-express';

import userSchema from './user';
import pinSchema from './pin';
import commentSchema from './comment';

const linkSchema = gql`

  scalar Date

  type Query {
    _: Boolean
  }
  type Mutation {
    _: Boolean
  }
  type Subscription {
    _: Boolean
  }
`;

export default [linkSchema, userSchema, pinSchema, commentSchema];
