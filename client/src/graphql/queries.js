export const ME_QUERY = `
  {
    me {
      id
      name
      email
      picture
      createdAt
    }
  }
`;

export const GET_PINS_QUERY = `
  {
    getPins {
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
        id
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
