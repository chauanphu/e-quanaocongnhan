import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  const host = process.env.NEXT_PUBLIC_DOMAIN as string
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/admin/',
    },
    sitemap: host + '/sitemap.xml',
  }
}
export const dynamic = "force-dynamic";
