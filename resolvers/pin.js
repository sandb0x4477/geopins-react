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
    deletePin: authenticated(async (parent, args, { models, currentUser }) => {
      const pinToRemove = await models.Pin.findOne({ where: { id: args.pinId } });
      if (pinToRemove.userId !== currentUser.id) {
        throw new AuthenticationError('Unauthorized!');
      }
      await models.Pin.destroy({ where: { id: args.pinId } });
      return pinToRemove;
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
    comments: async (pin, args, { models }) => {
      console.log('pin:', pin);
      return await models.Comment.findAll({
        where: {
          pinId: pin.id,
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
