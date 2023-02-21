import { mutations } from './mutations.js';
import { queries } from './queries.js';
import { subscriptions } from './subscriptions.js';

const resolvers = {
  Query: {
    ...queries,
  },
  Mutation: {
    ...mutations,
  },
  Subscription: {
    ...subscriptions,
  },
};

export default resolvers;
