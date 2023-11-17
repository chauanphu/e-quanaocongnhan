import PageDescription from '../components/page-description';
import Banner from '../components/Banner';
import Section from '../components/Section';
import banner_1 from '../public/images/banner-1.webp';
import team_icon from '../public/images/team.png';
import cart_icon from '../public/images/cart-icon.gif';

export default function Home() {

  return (
    <>
      <PageDescription title='Trang chủ'/>
      <Banner image={banner_1}/>
      <Section title={"Giới thiệu"} image={team_icon} contrast_bg={true}>
        Hello
      </Section>
      <Section title={"Sản phẩm"} image={cart_icon}>
        Hello
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