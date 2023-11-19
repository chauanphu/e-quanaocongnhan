
import Section from '@components/Section';
import prisma from 'lib/prisma';
import ProductCard from '@components/ProductCard';
import PageDescription from '@components/page-description';
import { CategoryWithProducts } from 'lib/prisma';

interface ShopProps {
  categories: CategoryWithProducts[];
}

export default function Shop({categories}:ShopProps) {
  const description = 'Trần Gia Phát chuyên may mặc đồng phục công nhân, đồng phục áo thun, đồng phục đầu bếp, thiết bị bảo hộ lao động,...'
  const keywords = 'Trần Gia Phát, đồng phục công nhân, đồng phục áo thun, đồng phục đầu bếp, thiết bị bảo hộ lao động'
  return (
    <>
      <PageDescription title='Sản phẩm' description={description} keywords={keywords}/>
      <Section title='Sản phẩm'>
        {categories && categories.map((category) => (
            <ProductCard key={category.id} category={category} products={category.products}/>
        ))}
      </Section>
    </>
  );
}

export async function getServerSideProps() {
  // Query all categories with their top 8 products
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
        take: 8,
      },
    },
  });
  return {
    props: {categories},
    // revalidate: 10,
  };
}