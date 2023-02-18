import { createPubSub, createSchema, createYoga } from 'graphql-yoga';

import { createServer } from 'http';
import { readFileSync } from 'fs';
import resolvers from './graphql/resolvers.js';

const typeDefs = readFileSync('src/graphql/schema.graphql', 'utf8');

const pubsub = createPubSub();

const schema = createSchema({ typeDefs, resolvers });

const context = {
  pubsub,
};

const yoga = createYoga({
  schema,
  context,
});

const server = createServer(yoga);

server.listen(4000, async () => {
  console.log('Server is running on http://localhost:4000');
});
