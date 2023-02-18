import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const mutations = {
  addDefaultData: async () => {
    if (await prisma.user.findFirst()) {
      return 'Data already exists';
    } else {
      await prisma.user.createMany({
        data: [
          {
            name: 'John',
          },
          {
            name: 'Jane',
          },
          {
            name: 'Jack',
          },
        ],
        skipDuplicates: true,
      });
    }

    if (await prisma.room.findFirst()) {
      return 'Data already exists';
    } else {
      await prisma.room.createMany({
        data: [
          {
            name: 'General',
          },
          {
            name: 'Random',
          },
          {
            name: 'Programming',
          },
        ],
        skipDuplicates: true,
      });
    }

    return true;
  },
  createRoom: async (parent, args, context, info) => {
    const { name } = args;
    const room = await prisma.room.create({
      data: {
        name,
      },
    });
    return room;
  },
};
