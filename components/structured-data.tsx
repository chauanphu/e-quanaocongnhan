import Head from 'next/head';

interface StructuredDataProps {
  data: any;
}

export default function StructuredData({data}: StructuredDataProps) {
  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
      />
    </Head>
  );
}