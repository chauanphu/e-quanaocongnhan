
import PageDescription from '@components/page-description';
import markdownToHtml from 'lib/markdownToHTML';
import { GetServerSideProps } from 'next';
import path from 'path';

type Props = {
  htmlContent?: string;
}

export default function AboutUs({htmlContent}:Props) {
  return (
    <>
      <PageDescription title='Giới thiệu' keywords='Đồng phục Trần Gia Phát, Về chúng tôi, Giới thiệu' />
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

  const descriptionPath = path.join(process.cwd(), '_posts', 'gioi-thieu.md');
  const htmlContent = await markdownToHtml(descriptionPath)
  return {
    props: {htmlContent},
    // revalidate: 10,
  };
}