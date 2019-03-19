import { gql } from 'apollo-server-express';

export default gql`

  extend type Query {
    # getPins: [Pin!]
    getComments: [Comment]
  },

  extend type Mutation {
    createComment(pinId: ID!, text: String!): Comment
  },

  type Comment {
    id: ID
    text: String
    createdAt: String
    user: User
  }

`;
