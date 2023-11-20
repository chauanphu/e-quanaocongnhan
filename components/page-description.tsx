import Head from 'next/head';
import banner_1 from 'public/images/banner-1.webp';
interface OpenGraph {
    title: string;
    url: string;
    type: string;
    image: string;

}

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
  // Get curent domain
  const domain = window.location.origin;
  // Get current page url
  const pageUrl = window.location.href;
  return (
    <Head key="page-description">
        <title>{msg}</title>
        <meta charSet='utf-8'/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <meta name="generator" content="Nextjs"/>
        <meta
            name="description" content={description} 
        />
        <meta name="keywords" content={keywords}/>
        {/* Set OG */}
        <meta property="og:type" content={og?.type ? og.type : "web"}/>
        <meta property="og:title" content={og?.title ? og.title : "Đồng phục Trần Gia Phát"}/>
        { og?.image ? 
          <meta property="og:image" content={`${domain}/api/images/banner/${og.image}`}/> 
          : 
          <meta property="og:image" content={`${domain}/api/images/banner/banner-1.webp`}/>
        }
        <meta property="og:description" content={description}/>
        <meta property="og:url" content={og?.url ? og.url : pageUrl}/>
        <meta property="og:locale" content="vi"/>
        <link rel='canonical' href={domain}/>
        {/*  */}
    </Head>
  );
}