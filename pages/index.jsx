import PageDescription from '../components/page-description';
import Banner from '../components/Banner';
import Section from '../components/Section';
import Carousel from '../components/Carousel';
import banner_1 from '../public/images/banner-1.webp';
import about_us_icon from '../public/images/about-us-icon.gif';
import customer_icon from '../public/images/team.png';
import cart_icon from '../public/images/cart-icon.gif';
import articles_icon from '../public/images/news-icon.gif';

import customers_baner from '../public/images/customers-banner.webp';
import data from '../data.json';

export default function Home() {
  const articles = data.articles;

  return (
    <>
      <PageDescription title='Trang chủ'/>
      <Banner image={banner_1} alt='Banner'/>
      <Section title={"Giới thiệu"} image={about_us_icon} contrast_bg={true}>
        Hello
      </Section>
      <Section title={"Sản phẩm"} image={cart_icon}>
        Hello
      </Section>
      <Section title={"Tin tức"} image={articles_icon} contrast_bg={true}>
        <Carousel articles={articles} seconds={3}/>
      </Section>
      <Section title={"Khách hàng"} image={customer_icon}>
        <Banner image={customers_baner} alt="Customer Banner"/>
      </Section>
    </>
  )
}

// Config as server side rendering
export async function getServerSideProps() {
  return {
    props: {
      // structuredData,
    },
  };
}