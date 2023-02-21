import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const queries = {
  users: async () => {
    return await prisma.user.findMany();
  },
  user: async (parent, args, context, info) => {
    return await prisma.user.findUnique({
      where: {
        id: args.id,
      },
    });
  },
  rooms: async () => {
    return await prisma.room.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        users: true,
        messages: {
          include: {
            user: true,
          },
        },
      },
    });
  },
  room: async (parent, args, context, info) => {
    const room = await prisma.room.findUnique({
      where: {
        id: +args.id,
      },
      include: {
        users: true,
        messages: {
          include: {
            user: true,
          },
        },
      },
    });

    if (!room) {
      throw new Error('Room not found');
    }

    return room;
  },
};
