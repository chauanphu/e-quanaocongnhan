import { getManyCategories } from "lib/query";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const host = process.env.NEXT_PUBLIC_DOMAIN as string;
  const categories = await getManyCategories();
  const categorySlugs = categories.map((category) => ({
    url: host + "/san-pham/" + category.slug,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));
  const routes = categorySlugs as MetadataRoute.Sitemap;
  return [
    {
      url: host,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: host + "/san-pham",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    // Add routes
    {
      url: host,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: host + "/san-pham",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    ...routes,
    {
      url: host + "/gioi-thieu",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];
}
export const dynamic = "force-dynamic";
