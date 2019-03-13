import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import { bodyParserGraphQL } from 'body-parser-graphql';
import { ApolloServer } from 'apollo-server-express';

import schema from './schema';
import resolvers from './resolvers';
import models, { sequelize } from './models';

import { findOrCreateUser } from './controllers/userController';

const app = express();
const PORT = process.env.PORT || 4008;

app.use(cors());
app.use(bodyParserGraphQL());

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: async ({ req }) => {
    let authToken = null;
    let currentUser = null;
    try {
      authToken = req.headers.authorization;
      if (authToken) {
        currentUser = await findOrCreateUser(authToken);
      }
    } catch (error) {
      console.error(`Unable to authenticate user with token ${authToken}`);
    }
    return {
      models,
      currentUser,
      // SECRET,
      // authUser,
    };
  },
});

server.applyMiddleware({ app, path: '/graphql', cors: false });

sequelize.sync().then(async () => {
  app.listen({ port: PORT }, () => {
    console.log(`Apollo Server on http://localhost:${PORT}/graphql`);
  });
});
