const tempUser = {
  id: '12312424',
  name: 'Sandb0x',
  email: 'test@tes.com',
  picture: 'https://cloudinary.com/adsdasd'
}


export default {
  // ===========================================================================
  // ? QUERIES
  // ===========================================================================
  Query: {
    me: async (parent, args, { models }) => {
      // return await models.User.findAll();
      return tempUser;
    },
  },
};
