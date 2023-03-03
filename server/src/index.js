import { createSchema, createYoga } from "graphql-yoga";
import { pubsub } from "./graphql/config/pubsub.js";

import { createServer } from "http";
import { readFileSync } from "fs";
import resolvers from "./graphql/resolvers.js";

const typeDefs = readFileSync("src/graphql/schema.graphql", "utf8");

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
  console.log("Server is running on http://localhost:4000");
});
