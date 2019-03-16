export const CREATE_PIN_MUTATION = `
  mutation($title: String!, $image: String!, $content: String!, $latitude: Float!, $longitude: Float!) {
    createPin(input: {
      title: $title,
      image: $image,
      content: $content,
      latitude: $latitude,
      longitude: $longitude
    }) {
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
    }
  }
`;
