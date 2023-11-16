import Head from 'next/head';
import PageDescription from '../components/page-description';

const HomePageHead = () => 
<Head>
  <title>Trang chủ - BHLĐ Trần Gia Phát</title>
  <meta charSet='UTF-8'/>
  <meta
    name="description" content="Trần Gia Phát chuyên sản xuất quần áo công nhân, đồng phục theo yêu cầu" 
  />
  <meta name="keywords" content="Quần áo công nhân, đồng phục công nhân, Trần Gia Phát"/>
</Head>

export default function Home() {

  return (
    <>
      <PageDescription title='Trang chủ'/>
      {/* Add Banner */}

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