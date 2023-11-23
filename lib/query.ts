import { Category } from "@prisma/client";
import prisma from "./prisma";
import { ProductWithCategory } from "./prisma";

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
              categoryId: true,
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

// Update categories by id
export async function updateCategoryById(id: string | undefined, data: any): Promise<string> {
  const updatedCategory = await prisma.category.update({
    where: { id: id || '' },
    data: data,
  });
  return updatedCategory.id;
}
// Create new Category if not exists in database
export async function createCategory(data: any): Promise<string> {
  const newCategory = await prisma.category.create({
    data: data,
  });
  return newCategory.id;
}

// Update categories by id if not exists then create new category
export async function updateOrCreateCategory(id: string | undefined, data: any): Promise<string> {
  const updatedCategory = await prisma.category.upsert({
    where: { id: id || '' },
    update: data,
    create: data,
  });
  return updatedCategory.id;
}


// Update products by id
export async function updateProductById(id: string | undefined, data: any): Promise<string> {
  const updatedProduct = await prisma.product.update({
    where: { id: id || '' },
    data: data,
  });
  return updatedProduct.id;
}
// Create new Product
export async function createProduct(data: any): Promise<string> {
  const newProduct = await prisma.product.create({
    data: data,
  });
  console.log(newProduct.id);
  return newProduct.id;
}
// Update products by id if not exists then create new product
export async function updateOrCreateProduct(id: string | undefined, data: any): Promise<string> {
  const updatedProduct = await prisma.product.upsert({
    where: { id: id || '' },
    update: data,
    create: data,
  });
  return updatedProduct.id;
}