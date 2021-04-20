import { ApolloServer } from 'apollo-server';
import { fileURLToPath } from 'url';
import Prisma from '@prisma/client';
import fs from 'fs';
import path from 'path';
import { getUserId } from './util.js';
import * as Query from './resolvers/Query.js';
import * as Mutation from './resolvers/Mutation.js';

const { PrismaClient } = Prisma;
const prisma = new PrismaClient({
  errorFormat: 'minimal',
});

const resolvers = {
  Query,
  Mutation,
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, 'schema.graphql'), 'utf8'),
  resolvers,
  context: ({ req }) => ({
    ...req,
    prisma,
    userId:
        req && req.headers.authorization
          ? getUserId(req)
          : null,
  }),
});

server.listen().then(({ url }) => console.log(`Server is running on ${url}`));
