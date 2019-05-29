import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import { bodyParserGraphQL } from 'body-parser-graphql';
import { ApolloServer } from 'apollo-server-express';
import http from 'http';

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
  context: async ({ req, connection }) => {
    if (connection) {
      return {
        models,
      };
    }

    if (req) {
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
      };
    }
  },
});

server.applyMiddleware({ app, path: '/graphql', cors: false });

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

sequelize.sync().then(async () => {
  httpServer.listen({ port: PORT }, () => {
    console.log(`Apollo Server on http://localhost:${PORT}/graphql`);
  });
});
