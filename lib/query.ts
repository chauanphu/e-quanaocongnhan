import { Category, Product } from "@prisma/client";
import prisma from "./prisma";
import { ProductWithCategory, CategoryWithSub } from "./prisma";

export async function getManyCategories(): Promise<Category[]> {
  const categories = await prisma.category.findMany();
  return categories;
}

export async function getManyCategoriesWithSub() {
  const categories = await prisma.category.findMany({
    where: {
      parentSlug: null
    },
    select: {
      name: true,
      slug: true,
      children: {
        select: {
          name: true,
          slug: true,
        },
      },
    },
  });
  return categories;
}

/**
 * Retrieves products for a given category.
 * 
 * @param category - The category object.
 * @returns An array of products.
 */
async function getProducts(category) {
  // Query for the category's products
  const products = await prisma.product.findMany({
    where: { categorySlug: category.slug },
    take: 8,
    select: {
      name: true,
      slug: true,
      image: true,
      sku: true,
      price: true,
      categorySlug: true,
    },
  });

  // Query for the category's child categories
  const childCategories = await prisma.category.findMany({ where: { parentSlug: category.slug } });

  // If the category has child categories, recursively fetch their products
  let childProducts: any[] = [];
  if (childCategories.length > 0) {
    childProducts = await Promise.all(childCategories.map(childCategory => getProducts(childCategory)));
  }

  // Combine the products of the parent category and its child categories
  const combinedProducts = [...products, ...childProducts.flat()];

  return combinedProducts;
}

/**
 * Retrieves multiple categories with their associated products.
 * @param page - The page number to retrieve the categories from.
 * @returns A promise that resolves to an array of categories with their associated products.
 */
export async function getManyCategoryWithProd(page: number) {
  const categories = await prisma.category.findMany({
    select: {
      name: true,
      slug: true,
    },
    where: {
      parentSlug: {
        not: null
      }
    }
  });

  // Map over the categories to fetch their products
  const categoriesWithProducts = await Promise.all(categories.map(async (category) => {
    const products = await getProducts(category);
    return { ...category, products };
  }));
  return categoriesWithProducts;
}

export async function getOneCategoryWithProd(slug: string) {
  const category = await prisma.category.findUnique({
    where: {
      slug,
    },
    select: {
      name: true,
      slug: true,
    },
  });

  const products = await getProducts(category);

  return { ...category, products };
}

export async function getOneProductBySlug(
  slug: string
): Promise<ProductWithCategory | null> {
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

export async function getManyRelatedProduct(
  parentSlug: string,
  thisSlug: string
): Promise<Product[] | null> {
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
export async function updateCategoryById(
  slug: string | undefined,
  data: any
): Promise<string | null> {
  try {
    const updatedCategory = await prisma.category.update({
      where: { slug: slug || "" },
      data: data,
    });
    return updatedCategory.slug;
  } catch (error) {
    return null;
  }
}
// Create new Category if not exists in database
export async function createCategory(data: any): Promise<string> {
  const newCategory = await prisma.category.create({
    data: data,
  });
  return newCategory.slug;
}

// Update categories by slug if not exists then create new category
export async function updateOrCreateCategory(
  slug: string | undefined,
  data: any
): Promise<string | null> {
  try {
    const updatedCategory = await prisma.category.upsert({
      where: { slug: slug || "" },
      update: data,
      create: data,
    });
    return updatedCategory.slug;
  } catch (error) {
    return null;
  }
}

// Update products by slug
export async function updateProductById(
  slug: string | undefined,
  data: any
): Promise<string | null> {
  try {
    const updatedProduct = await prisma.product.update({
      where: { slug: slug || "" },
      data: data,
    });
    return updatedProduct.slug;
  } catch (error) {
    return null;
  }
}
// Create new Product
export async function createProduct(data: any): Promise<string> {
  const newProduct = await prisma.product.create({
    data: data,
  });
  return newProduct.slug;
}
// Update products by slug if not exists then create new product
export async function updateOrCreateProduct(
  slug: string | undefined,
  data: any
): Promise<string | null> {
  try {
    const updatedProduct = await prisma.product.upsert({
      where: { slug: slug || "" },
      update: data,
      create: data,
    });
    return updatedProduct.slug;
  } catch (error) {
    return null;
  }
}
