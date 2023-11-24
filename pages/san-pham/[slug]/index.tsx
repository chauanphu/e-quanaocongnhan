
import Section from '@components/Section';
import prisma from 'lib/prisma';
import PageDescription from '@components/page-description';
import { CategoryWithProducts } from 'lib/prisma';
import { GetServerSideProps } from 'next';
import ProductList from '@components/ProductList';
interface ShopProps {
  category: CategoryWithProducts;
}

export default function Shop({category}:ShopProps) {
  const description = 'Trần Gia Phát chuyên may mặc đồng phục công nhân, đồng phục áo thun, đồng phục đầu bếp, thiết bị bảo hộ lao động,...'
  const keywords = 'Trần Gia Phát, đồng phục công nhân, đồng phục áo thun, đồng phục đầu bếp, thiết bị bảo hộ lao động'
  return (
    <>
      <PageDescription title={category.name} description={description} keywords={keywords}/>
      <Section title={category.name}>
          {category.products && 
            <ProductList 
              key={category.slug} 
              hasTitle={false}
              category={category}
              products={category.products}/>
          }
      </Section>
    </>
  );
}

// Config as server side rendering get slug from params
export const getServerSideProps: GetServerSideProps = async ({params}) => {
  const slug = params?.slug || '';
  // Query the category with its top 8 products by slug
  const category = await prisma.category.findUnique({
    where: {
      slug: slug as string,
    },
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
          categorySlug: true
        },
        take: 8,
      },
    },
  });
  return {
    props: {category},
    // revalidate: 10,
  };
}