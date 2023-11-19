import { PrismaClient, Prisma, Category, Product } from '@prisma/client';

let prisma: PrismaClient;

const categoryWithProducts = Prisma.validator<Prisma.CategoryDefaultArgs>()({
  include: { products: true },
})

const categoryWithSub = Prisma.validator<Prisma.CategoryDefaultArgs>()({
  include: { children: true },
})

export type CategoryWithProducts = Prisma.CategoryGetPayload<typeof categoryWithProducts>
export type CategoryWithSub = Prisma.CategoryGetPayload<typeof categoryWithSub>

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export default prisma;