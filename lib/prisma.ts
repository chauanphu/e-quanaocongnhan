import { PrismaClient, Prisma, Category, Product } from '@prisma/client';

let prisma: PrismaClient;

const categoryWithProducts = Prisma.validator<Prisma.CategoryDefaultArgs>()({
  include: { products: true },
})
export type CategoryWithProducts = Prisma.CategoryGetPayload<typeof categoryWithProducts>

const categoryWithSub = Prisma.validator<Prisma.CategoryDefaultArgs>()({
  include: { children: true },
})
export type CategoryWithSub = Prisma.CategoryGetPayload<typeof categoryWithSub>

// create type for product with category
const productWithCategory = Prisma.validator<Prisma.ProductDefaultArgs>()({
  include: { category: true },
})
export type ProductWithCategory = Prisma.ProductGetPayload<typeof productWithCategory>

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
  // Check for database connection
  prisma.$connect().then(() => {
    console.log('Database connected!');
  }).catch((err) => {
    console.log('Database connection failed!');
    console.log(err);
  });
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export default prisma;