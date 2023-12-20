import { getAllSlugs } from "lib/query";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const host = process.env.NEXT_PUBLIC_DOMAIN as string;
  const slugs = await getAllSlugs();
  const categorySlugs = slugs.map((slug) => ({
    url: host + "/san-pham/" + slug,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));
  const routes = categorySlugs as MetadataRoute.Sitemap;
  return [
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
