import Head from 'next/head';

export default function HomeStructuredData({ data }) {
  return (
    <Head>
      <script
        key="homepage-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
      />
    </Head>
  );
}