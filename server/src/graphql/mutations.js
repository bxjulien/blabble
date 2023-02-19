import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const mutations = {
  createRoom: async (parent, args, context, info) => {
    const { name } = args;
    const room = await prisma.room.create({
      data: {
        name,
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

    const deletedRoom = await prisma.room.delete({
      where: {
        id: +id,
      },
    });

    return deletedRoom;
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
