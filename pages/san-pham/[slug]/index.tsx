import Section from "@components/Section";
import prisma from "lib/prisma";
import PageDescription from "@components/page-description";
import { CategoryWithProducts } from "lib/prisma";
import { GetServerSideProps } from "next";
import ProductList from "@components/ProductList";
import { getOneCategoryWithProd } from "lib/query";
import Pagniation from "@components/Pagniation";
import { useRouter } from "next/router";
interface ShopProps {
  category: CategoryWithProducts;
  totalProduct: number;
}

export default function Shop({ category, totalProduct }: ShopProps) {
  // Get the page number from query
  const router = useRouter();
  const currentPage = Number(router.query.page) || 1;

  const description =
    "Trần Gia Phát chuyên may mặc đồng phục công nhân, đồng phục áo thun, đồng phục đầu bếp, thiết bị bảo hộ lao động,...";
  const keywords =
    "Trần Gia Phát, đồng phục công nhân, đồng phục áo thun, đồng phục đầu bếp, thiết bị bảo hộ lao động";
  return (
    <>
      <PageDescription
        title={category.name}
        description={description}
        keywords={keywords}
      />
      <Section title={category.name}>
        {category.products && (
          <>
            <ProductList
              key={category.slug}
              hasTitle={false}
              category={category}
              products={category.products}
              isCarousel={false}
            />
            <Pagniation currentPage={currentPage} productsPerPage={12} onPageChange={page => {
              router.push(`/san-pham/${category.slug}?page=${page}`);
            } } totalProducts={totalProduct}/>
          </>
        )}
      </Section>
    </>
  );
}

// Config as server side rendering get slug from params
export const getServerSideProps: GetServerSideProps = async (context) => {
  const slug = context.params?.slug || "";
  const page = context.query.page || 1;
  // Query the category with its top 12 products by slug
  const result = await getOneCategoryWithProd(
    slug as string,
    page as number,
    12
  );
  const category = result.category;
  const totalProduct = result.total;
  return {
    props: { category, totalProduct },
    // revalidate: 10,
  };
};
