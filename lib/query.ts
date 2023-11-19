import prisma from "./prisma";
import { Product } from "@prisma/client";
import { ProductWithCategory } from "./prisma";
// export async function getAllCategoryWithSub {
//     const categories = await prisma.category.findMany({
//         include: {
//         subCategories: true,
//         },
//     });
    
//     return categories;
// }

export async function getManyCategoryWithProd(prodPerCate: number) {
    const categories = await prisma.category.findMany({
        select: {
          id: true,
          name: true,
          slug: true,
          products: {
            select: {
              id: true,
              name: true,
              slug: true,
              image: true,
              price: true,
              sku: true,
            },
            take: prodPerCate,
          },
        },
      });
    return categories;
}

export async function getOneProductBySlug(slug: string): Promise<ProductWithCategory | null> {
  const product = await prisma.product.findUnique({
    where: {
      slug,
    },
    include: {
      category: true,
    },
  });
  return product;
}

export async function getManyRelatedProduct(parentId: string, thisId: string):Promise<ProductWithCategory[] | null> {
  // Query other products with same parent category randomly
  const relatedProducts = await prisma.product.findMany({
    where: {
      categoryId: parentId,
      NOT: {
        id: thisId,
      },
    },
    include: {
      category: true,
    },
    take: 4,
  });
  return relatedProducts;
}