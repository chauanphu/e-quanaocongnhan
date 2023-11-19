import prisma from "./prisma";
import { Product } from "@prisma/client";

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

export async function getOneProductBySlug(slug: string): Promise<Product | null> {
    const product = await prisma.product.findUnique({
        where: {
          slug: slug.toString(),
        }
    });
    return product;
}