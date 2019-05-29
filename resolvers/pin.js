import { AuthenticationError, PubSub } from 'apollo-server';

const pubsub = new PubSub();
const PIN_ADDED = 'PIN_ADDED';
const PIN_DELETED = "PIN_DELETED";
const PIN_UPDATED = "PIN_UPDATED";

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

      const pinToReturn = await models.Pin.create(newPin);
      console.log('pinToReturn:', pinToReturn);
      pubsub.publish(PIN_ADDED, { pinToReturn });

      return pinToReturn;
    }),
    deletePin: authenticated(async (parent, args, { models, currentUser }) => {
      const pinToRemove = await models.Pin.findOne({ where: { id: args.pinId } });
      if (pinToRemove.userId !== currentUser.id) {
        throw new AuthenticationError('Unauthorized!');
      }
      await models.Pin.destroy({ where: { id: args.pinId } });
      pubsub.publish(PIN_DELETED, { pinToRemove });
      return pinToRemove;
    }),
  },

  Pin: {
    user: async (pin, args, { models }) => {
      return await models.User.findOne({
        where: {
          id: pin.userId,
        },
      });
    },
    comments: async (pin, args, { models }) => {
      console.log('pin:', pin);
      return await models.Comment.findAll({
        where: {
          pinId: pin.id,
        },
      });
    },
  },

  Subscription: {
    pinAdded: {
      subscribe: () => pubsub.asyncIterator(PIN_ADDED),
    },
    pinDeleted: {
      subscribe: () => pubsub.asyncIterator(PIN_DELETED)
    }
  },
};
