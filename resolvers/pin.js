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
    getPins: async (parent, args, { models }) => {
      return await models.Pin.findAll();
      // return 'This is pin';
    },
  },

  // =============================================================================
  // ? MUTATIONS
  // =============================================================================
  Mutation: {
    createPin: authenticated(async (parent, args, { models, currentUser }) => {
      console.log('currentUser:', currentUser);
      const newPin = {
        ...args.input,
        userId: currentUser.id,
      };

      return await models.Pin.create(newPin);
    }),
  },

  Pin: {
    user: async (pin, args, { models }) => {
      return await models.User.findOne({
        where: {
          id: pin.userId,
        }
      });
    },
    // customer: async (rental, args, { models }) => {
    //   return await models.Customer.findOne({
    //     where: {
    //       id: rental.customerId,
    //     }
    //   });
    // }
  },
};
