import { PrismaClient } from '@prisma/client';
import { pubsub } from './config/pubsub.js';

const prisma = new PrismaClient();

export const mutations = {
  createRoom: async (parent, args, context, info) => {
    const { name, userId } = args;
    const room = await prisma.room.create({
      data: {
        name,
        users: {
          connect: {
            id: +userId,
          },
        },
      },
    });
    return room;
  },
  deleteRoom: async (parent, args, context, info) => {
    const { id } = args;

    const room = await prisma.room.findFirst({
      where: {
        id: +id,
      },
    });

    if (!room) {
      throw new Error('Room not found');
    }

    const deletedMessages = await prisma.message.deleteMany({
      where: {
        roomId: +id,
      },
    });

    const deletedRoom = await prisma.room.delete({
      where: {
        id: +id,
      },
    });

    return deletedRoom;
  },
  postMessage: async (parent, args, context, info) => {
    const { text, userId, roomId } = args;

    const room = await prisma.room.findFirst({
      where: {
        id: +roomId,
      },
    });

    if (!room) {
      throw new Error('Room not found');
    }

    const user = await prisma.user.findFirst({
      where: {
        id: +userId,
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    const message = await prisma.message.create({
      data: {
        text,
        user: {
          connect: {
            id: +userId,
          },
        },
        room: {
          connect: {
            id: +roomId,
          },
        },
      },
      include: {
        user: true,
        room: true,
      },
    });

    pubsub.publish(`MESSAGE_CREATED_ROOM_${room.id}`, {
      messageCreated: message,
    });

    return message;
  },
  login: async (parent, args, context, info) => {
    const { name, pinCode } = args;

    let user = await prisma.$queryRaw`
      SELECT * FROM User 
      WHERE lower(name) = lower(${name}) 
      LIMIT 1
    `;

    if (user && user.length) {
      user = user[0];
      if (user.pinCode === pinCode) {
        return user;
      }
      throw new Error('Incorrect pinCode');
    } else {
      const newUser = await prisma.user.create({
        data: {
          name,
          pinCode,
        },
      });
      return newUser;
    }
  },
};
