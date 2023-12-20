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
      parentSlug: null,
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
async function getProducts(category, limit?): Promise<Product[]> {
  // Query for the category's products
  const products = await prisma.product.findMany({
    where: { categorySlug: category.slug },
    select: {
      name: true,
      slug: true,
      image: true,
      rating: true,
      sku: true,
      price: true,
      categorySlug: true,
    },
    // If a limit is provided, limit the number of products returned
    take: limit,
    orderBy: {
      sku: "asc",
    },
  });

  // Query for the category's child categories
  const childCategories = await prisma.category.findMany({
    where: { parentSlug: category.slug },
  });

  // If the category has child categories, recursively fetch their products
  let childProducts: any[] = [];
  if (childCategories.length > 0) {
    childProducts = await Promise.all(
      childCategories.map((childCategory) => getProducts(childCategory))
    );
  }

  // Combine the products of the parent category and its child categories
  const combinedProducts = [...products, ...childProducts.flat()];

  return combinedProducts;
}

export async function getManyCategoryWithProd(limit) {
  const categories = await prisma.category.findMany({
    select: {
      name: true,
      slug: true,
    },
    where: {
      OR: [
        {
          parentSlug: {
            not: null,
          },
        },
        {
          AND: [
            {
              parentSlug: null,
            },
            {
              children: {
                none: {},
              },
            },
          ],
        }
      ],
    },
  });

  // Map over the categories to fetch their products
  const categoriesWithProducts = await Promise.all(
    categories.map(async (category) => {
      const products = await getProducts(category, limit);
      return { ...category, products };
    })
  );
  return categoriesWithProducts;
}

/**
 * Retrieves a category with its associated products.
 * @param slug - The slug of the category.
 * @param page - The page number for pagination (default: 1).
 * @param limit - The maximum number of products per page (default: 8).
 * @returns A promise that resolves to an object containing the category details, paginated products, and total number of products.
 */
export async function getOneCategoryWithProd(
  slug: string,
  page: number = 1,
  limit: number = 8
) {
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
  const start = (page - 1) * limit;
  const end = products.length > start + limit ? start + limit : products.length;
  const result = {
    ...category,
    products: products.slice(start, end),
  };
  return { category: result, total: products.length };
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

// Create a function get all slugs including, categories, subcategories and products for sitemap
export async function getAllSlugs(): Promise<string[]> {
  const categories = await getManyCategories();
  let slugs: string[] = [];
  for (const category of categories) {
    const products = await getProducts(category);
    slugs.push(category.slug);
    for (const product of products) {
      slugs.push(category.slug + '/' + product.slug);
    }
  }
  return slugs;
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
