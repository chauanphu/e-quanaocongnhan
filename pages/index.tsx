import PageDescription from '../components/page-description';
import Banner from '../components/Banner';
import Section from '../components/Section';
// import { Product, Category } from '@prisma/client';
import { CategoryWithProducts } from '../lib/prisma';
import about_us_icon from '../public/images/about-us-icon.gif';
import customer_icon from '../public/images/team.png';
import cart_icon from '../public/images/cart-icon.gif';
import articles_icon from '../public/images/news-icon.gif';
import process_banner from '../public/images/qui-trinh-dat-hang.webp';

import customers_baner from '../public/images/customers-banner.webp';
import { getManyCategoryWithProd } from 'lib/query';
import ProductList from '@components/ProductList';


interface HomeProps {
  categories: CategoryWithProducts[];
}
export default function Home({categories}: HomeProps) {
  return (
    <>
      <PageDescription title='Trang chủ' keywords='Châu Gia Phát, Trang chủ, đèn giao thông, an toàn giao thông'/>
      <Banner image={['/api/images/banner/banner-main.webp', '/api/images/banner/banner-1.webp']} isCarousel={true} alt='Banner'/>
      <Section title={"Giới thiệu"} image={about_us_icon} contrast_bg={true}>
        <Banner image={process_banner} alt="Qui trình đặt hàng"/>
      </Section>
      <Section title={"Sản phẩm"} image={cart_icon}>
        {categories && categories.map((category) => (
          <ProductList key={category.slug} category={category} products={category.products}/>
        ))}
      </Section>
      <Section title={"Tin tức"} image={articles_icon} contrast_bg={true}>
        Hello
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
  // Query all categories with their top 8 products
  const categories = await getManyCategoryWithProd(8)
  return {
    props: {categories},
  };
}