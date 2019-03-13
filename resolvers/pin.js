
export default {
  // ===========================================================================
  // ? QUERIES
  // ===========================================================================
  Query: {
    getPins: async (parent, args, { models }) => {
      // return await models.User.findAll();
      return 'This is pin';
    },
  },
};
