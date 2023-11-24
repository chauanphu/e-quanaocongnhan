import { Category, Product } from "@prisma/client";
import prisma from "./prisma";
import { ProductWithCategory } from "./prisma";

export async function getManyCategoryWithProd(prodPerCate: number) {
    const categories = await prisma.category.findMany({
        select: {
          name: true,
          slug: true,
          products: {
            select: {
              name: true,
              slug: true,
              image: true,
              price: true,
              sku: true,
              categorySlug: true,
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

export async function getManyRelatedProduct(parentSlug: string, thisSlug: string):Promise<Product[] | null> {
  // Query other products with same parent category randomly
  const relatedProducts = await prisma.product.findMany({
    where: {
      categorySlug: parentSlug,
      NOT: {
        slug: thisSlug,
      },
    },
    include: {
      category: true,
    },
    take: 4,
  });
  return relatedProducts;
}

// Update categories by slug
export async function updateCategoryById(slug: string | undefined, data: any): Promise<string> {
  const updatedCategory = await prisma.category.update({
    where: { slug: slug || '' },
    data: data,
  });
  return updatedCategory.slug;
}
// Create new Category if not exists in database
export async function createCategory(data: any): Promise<string> {
  const newCategory = await prisma.category.create({
    data: data,
  });
  return newCategory.slug;
}

// Update categories by slug if not exists then create new category
export async function updateOrCreateCategory(slug: string | undefined, data: any): Promise<string> {
  console.log(slug);
  const updatedCategory = await prisma.category.upsert({
    where: { slug: slug || '' },
    update: data,
    create: data,
  });
  return updatedCategory.slug;
}


// Update products by slug
export async function updateProductById(slug: string | undefined, data: any): Promise<string> {
  const updatedProduct = await prisma.product.update({
    where: { slug: slug || '' },
    data: data,
  });
  return updatedProduct.slug;
}
// Create new Product
export async function createProduct(data: any): Promise<string> {
  const newProduct = await prisma.product.create({
    data: data,
  });
  return newProduct.slug;
}
// Update products by slug if not exists then create new product
export async function updateOrCreateProduct(slug: string | undefined, data: any): Promise<string> {
  const updatedProduct = await prisma.product.upsert({
    where: { slug: slug || '' },
    update: data,
    create: data,
  });
  return updatedProduct.slug;
}