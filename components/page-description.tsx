import Head from 'next/head';
import { OpenGraph } from 'next/dist/lib/metadata/types/opengraph-types';

export interface IPageDescription {
  title: string;
  description?: string;
  keywords: string;
  og?: OpenGraph;
}

export default function PageDescription({ 
    title = 'Trang chủ', 
    description = "Trần Gia Phát chuyên sản xuất quần áo công nhân, đồng phục theo yêu cầu",
    keywords="Quần áo công nhân, đồng phục công nhân, Trần Gia Phát",
    og }: IPageDescription) {
  const msg = `${title} - BHLĐ Trần Gia Phát`;
  const domain = process.env['PUBLIC_DOMAIN']
  return (
    <Head key="page-description">
        <title>{msg}</title>
        <meta charSet='utf-8'/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <meta name="generator" content="Nextjs"/>
        <meta
            name="description" content={description} 
        />
        <meta name="keywords" content={keywords}/>
        {/* Set OG */}
        <meta property="og:type" content={"web"}/>
        <meta property="og:title" content={og?.title ? og.title as string : "Đồng phục Trần Gia Phát"}/>
        { og?.images ? 
          <meta property="og:image" content={`${domain}/api/images/banner/${og.images}`}/> 
          : 
          <meta property="og:image" content={`${domain}/api/images/banner/banner-1.webp`}/>
        }
        <meta property="og:description" content={description}/>
        <meta property="og:url" content={`${domain}/${og?.url ? og.url: ''}`}/>
        <meta property="og:locale" content="vi"/>
        <link rel='canonical' href={process.env['PUBLIC_DOMAIN']}/>
        {/*  */}
    </Head>
  );
}