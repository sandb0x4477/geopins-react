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

      return await models.Comment.create(newComment);
    }),
    // deletePin: authenticated(async (parent, args, { models, currentUser }) => {
    //   const pinToRemove = await models.Pin.findOne({ where: { id: args.pinId } });
    //   if (pinToRemove.userId !== currentUser.id) {
    //     throw new AuthenticationError('Unauthorized!');
    //   }
    //   await models.Pin.destroy({ where: { id: args.pinId } });
    //   return pinToRemove;
    // }),
  },

  Comment: {
    user: async (comment, args, { models }) => {
      return await models.User.findOne({
        where: {
          id: comment.userId,
        }
      });
    },
    // comments: async (pin, args, { models }) => {
    //   return await models.Comment.findAll({
    //     where: {
    //       pinId: pin.pinId,
    //     }
    //   });
    // },
    // customer: async (rental, args, { models }) => {
    //   return await models.Customer.findOne({
    //     where: {
    //       id: rental.customerId,
    //     }
    //   });
    // }
  },
};
