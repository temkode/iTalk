import { ApolloServer } from 'apollo-server';
import { fileURLToPath } from 'url';
import Prisma from '@prisma/client';
import fs from 'fs';
import path from 'path';
import * as Query from './resolvers/Query.js';

const { PrismaClient } = Prisma;
const prisma = new PrismaClient({
  errorFormat: 'minimal',
});

const resolvers = {
  Query,
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, 'schema.graphql'), 'utf8'),
  resolvers,
  context: {
    prisma,
  },
});

server.listen().then(({ url }) => console.log(`Server is running on ${url}`));
