import Head from 'next/head';

interface StructuredDataProps {
  key: string;
  data: any;
}

export default function StructuredData({ key='structured-data', data }: StructuredDataProps) {
  return (
    <Head>
      <script
        key="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
      />
    </Head>
  );
}