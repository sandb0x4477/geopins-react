
export default {
  // ===========================================================================
  // ? QUERIES
  // ===========================================================================
  Query: {
    me: async (parent, args, { models }) => {
      // return await models.User.findAll();
      return 'This is me';
    },
  },
};
