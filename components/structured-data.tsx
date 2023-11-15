import Head from 'next/head';

interface StructuredDataProps {
  title?: string;
  data: any;
}

export default function StructuredData({ title, data }: StructuredDataProps) {
  return (
    <Head>
      <script
        key="structured-data"
        type="application/ld+json"
        title={title}
        dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
      />
    </Head>
  );
}