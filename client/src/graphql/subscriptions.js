import gql from 'graphql-tag';

export const PIN_ADDED_SUBSCRIPTION = gql`
  subscription {
    pinAdded {
      id
      createdAt
      title
      image
      content
      latitude
      longitude
      user {
        id
        name
        email
        picture
      }
      comments {
        text
        createdAt
        user {
          name
          picture
        }
      }
    }
  }
`;

export const PIN_UPDATED_SUBSCRIPTION = gql`
  subscription {
    pinUpdated {
      id
      createdAt
      title
      image
      content
      latitude
      longitude
      user {
        id
        name
        email
        picture
      }
      comments {
        text
        createdAt
        user {
          name
          picture
        }
      }
    }
  }
`;

export const PIN_DELETED_SUBSCRIPTION = gql`
  subscription {
    pinDeleted {
      id
    }
  }
`;
