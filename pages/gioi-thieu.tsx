
import PageDescription from '@components/page-description';
import markdownToHtml from 'lib/markdownToHTML';
import { GetServerSideProps } from 'next';
import path from 'path';
import { OpenGraph } from 'next/dist/lib/metadata/types/opengraph-types';
type Props = {
  htmlContent?: string;
}

export default function AboutUs({htmlContent}:Props) {
  const page_og = {
    'url': 'gioi-thieu',
  } as OpenGraph;

  return (
    <>
      <PageDescription 
        title='Giới thiệu' 
        keywords='Đồng phục Trần Gia Phát, Về chúng tôi, Giới thiệu'
        og={page_og} />
      <section className='container'>
        <div dangerouslySetInnerHTML={{ __html: htmlContent || 'Chưa cập nhật' }} />
      </section>
    </>
  );
}

// Config as server side rendering get slug from params
export const getServerSideProps: GetServerSideProps = async ({params}) => {
  const slug = params?.product || '';
  // // Query the category with its top 8 products by slug
  const descriptionPath = path.join(process.cwd(), 'data', '_posts', 'gioi-thieu.md');
  const htmlContent = await markdownToHtml(descriptionPath)
  return {
    props: {htmlContent},
    // revalidate: 10,
  };
}