
import Section from '@components/Section';
import prisma from 'lib/prisma';
import ProductCard from '@components/ProductCard';
import PageDescription from '@components/page-description';
import { CategoryWithProducts } from 'lib/prisma';
import { GetServerSideProps } from 'next';
interface ShopProps {
  category: CategoryWithProducts;
}

export default function Shop({category}:ShopProps) {
  const description = 'Trần Gia Phát chuyên may mặc đồng phục công nhân, đồng phục áo thun, đồng phục đầu bếp, thiết bị bảo hộ lao động,...'
  const keywords = 'Trần Gia Phát, đồng phục công nhân, đồng phục áo thun, đồng phục đầu bếp, thiết bị bảo hộ lao động'
  return (
    <>
      <PageDescription title='Sản phẩm' description={description} keywords={keywords}/>
      <Section title={category.name}>
          {category.products && 
            <ProductCard 
              key={category.id} 
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
  console.log(slug)
  // Query the category with its top 8 products by slug
  const category = await prisma.category.findUnique({
    where: {
      slug: slug.toString(),
    },
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
        take: 8,
      },
    },
  });
  return {
    props: {category},
    // revalidate: 10,
  };
}