import PageDescription from '../components/page-description';
import Banner from '../components/Banner';
import Section from '../components/Section';
import ArticleCarousel from '../components/ArticleCarousel';
import ProductCard from '../components/ProductCard';
// import { Product, Category } from '@prisma/client';
import prisma from '../lib/prisma';
import { CategoryWithProducts } from '../lib/prisma';
import banner_1 from '../public/images/banner-1.webp';
import about_us_icon from '../public/images/about-us-icon.gif';
import customer_icon from '../public/images/team.png';
import cart_icon from '../public/images/cart-icon.gif';
import articles_icon from '../public/images/news-icon.gif';
import process_banner from '../public/images/qui-trinh-dat-hang.webp';

import customers_baner from '../public/images/customers-banner.webp';


interface HomeProps {
  categories: CategoryWithProducts[];
}
export default function Home({categories}: HomeProps) {
  // const articles = data.articles;
  // const products = data.products;
  return (
    <>
      <PageDescription title='Trang chủ' keywords='Trần Gia Phát, Trang chủ, đồng phục'/>
      <Banner image={banner_1} alt='Banner'/>
      <Section title={"Giới thiệu"} image={about_us_icon} contrast_bg={true}>
        <Banner image={process_banner} alt="Qui trình đặt hàng"/>
      </Section>
      <Section title={"Sản phẩm"} image={cart_icon}>
        {categories && categories.map((category) => (
          <ProductCard key={category.id} category={category} products={category.products}/>
        ))}
        {/* <ProductCard category={category} products={}/> */}
      </Section>
      <Section title={"Tin tức"} image={articles_icon} contrast_bg={true}>
        {/* <ArticleCarousel articles={articles} seconds={3}/> */}
      </Section>
      <Section title={"Khách hàng"} image={customer_icon}>
        <Banner image={customers_baner} alt="Customer Banner"/>
      </Section>
    </>
  )
}

// Config as server side rendering
export async function getServerSideProps() {
  // Query all categories with their top 10 products
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
        take: 10,
      },
    },
  });
  return {
    props: {categories},
    // revalidate: 10,
  };
}