import models from '../models';
import { OAuth2Client } from 'google-auth-library';

const client = new OAuth2Client(process.env.OAUTH_CLIENT_ID);

const findOrCreateUser = async token => {
  const googleUser = await verifyAuthToken(token);
  const user = await checkIfUserExists(googleUser.email);
  // console.log('user:', user);
  // console.log('googleUser:', googleUser);
  const userToReturn = user ? user : createNewUser(googleUser);
  console.log('userToReturn:', userToReturn);
  return userToReturn;
};

const verifyAuthToken = async token => {
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.OAUTH_CLIENT_ID,
    });
    return ticket.getPayload();
  } catch (error) {
    console.error('Error verifying auth token', error);
  }
};

const checkIfUserExists = async email =>
  await models.User.findOne({
    where: {
      email,
    },
  });

const createNewUser = async googleUser => {
  const { name, email, picture } = googleUser;
  const user = { name, email, picture };
  return await models.User.create(user);
};

export default findOrCreateUser;
