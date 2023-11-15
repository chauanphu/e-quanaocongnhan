import Head from 'next/head';
import StructureData from '../components/structured-data';
import styles from '../styles/Home.module.css'

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
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'Title of the blog post',
    description: 'Description of the blog post',
    author: [
      {
      '@type': 'Person',
      name: 'John Doe',
      },
    ],
    datePublished: '2022-09-14T09:00:00.000Z',
  };

  return (
    <>
      <StructureData />
      <HomePageHead />
      <h1>Home Page</h1>
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