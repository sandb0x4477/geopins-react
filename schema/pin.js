import { gql } from 'apollo-server-express';

export default gql`

  extend type Query {
    # getPins: [Pin!]
    getPins: String
  }

  extend type Mutation {
    createPin(input: CreatePinInput!): Pin
    deletePin(pinId: ID!): Pin
  }

  type Pin {
    id: ID
    createdAt: String
    title: String
    content: String
    image: String
    latitude: Float
    longitude: Float
    # author: User
    # comments: [Comment]
  }

  input CreatePinInput {
    title: String
    image: String
    content: String
    latitude: Float
    longitude: Float
  }

`;
