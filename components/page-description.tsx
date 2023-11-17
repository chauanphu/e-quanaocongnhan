import Head from 'next/head';

interface PageDescription {
  title: string;
  description?: string;
  keywords: string;
}

export default function PageDescription({ 
    title = 'Trang chủ', 
    description = "Trần Gia Phát chuyên sản xuất quần áo công nhân, đồng phục theo yêu cầu",
    keywords="Quần áo công nhân, đồng phục công nhân, Trần Gia Phát" }: PageDescription) {
  return (
    <Head key="page-description">
        
        <title>{title} - BHLĐ Trần Gia Phát</title>
        <meta charSet='utf-8'/>
        <meta
            name="description" content={description} 
        />
        <meta name="keywords" content={keywords}/>
    </Head>
  );
}