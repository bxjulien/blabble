import { pubsub } from './config/pubsub.js';

export const subscriptions = {
  messageCreated: {
    subscribe: (_, { roomId }) => {
      return pubsub.asyncIterator(`MESSAGE_CREATED_ROOM_${roomId}`);
    },
  },
};
