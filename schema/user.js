import { gql } from 'apollo-server-express';

export default gql`

  extend type Query {
    me: User
  }

  type User {
    id: ID
    name: String
    email: String
    picture: String
  }

`;
