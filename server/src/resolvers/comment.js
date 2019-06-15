import { AuthenticationError, PubSub } from 'apollo-server';

const pubsub = new PubSub();
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
    getComments: async (parent, args, { models }) => {
      return await models.Comment.findAll();
    },
  },

  // =============================================================================
  // ? MUTATIONS
  // =============================================================================
  Mutation: {
    createComment: authenticated(async (parent, args, { models, currentUser }) => {
      console.log('currentUser:', currentUser);
      const newComment = {
        ...args,
        userId: currentUser.id,
      };
      const commentToReturn = await models.Comment.create(newComment);
      pubsub.publish(PIN_UPDATED, { commentToReturn });
      return commentToReturn;
    }),
  },

  Comment: {
    user: async (comment, args, { models }) => {
      return await models.User.findOne({
        where: {
          id: comment.userId,
        }
      });
    },
  },

  Subscription: {
    pinUpdated: {
      subscribe: () => pubsub.asyncIterator(PIN_UPDATED)
    }
  },
};
