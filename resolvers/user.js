import { AuthenticationError } from 'apollo-server';

const authenticated = next => (parent, args, { models, currentUser }, info) => {
  if (!currentUser) {
    throw new AuthenticationError('You must be logged in!');
  }
  return next(parent, args, { models, currentUser }, info);
};

export default {
  // ===========================================================================
  // ? QUERIES
  // ===========================================================================
  Query: {
    me: authenticated((parent, args, { models, currentUser }, info) => currentUser),
  },
};
