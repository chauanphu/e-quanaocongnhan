
import PageDescription from '@components/page-description';
import { GetServerSideProps } from 'next';
import { getManyRelatedProduct, getOneProductBySlug } from 'lib/query'
import { getContact } from 'lib/utils';
import { ProductWithCategory } from 'lib/prisma';

import { Product } from '@prisma/client';
import Image from 'next/image';
import styles from 'styles/SinglePageProduct.module.scss'
import Link from 'next/link';
import home_icon from 'public/images/home-icon.svg'
import MyCarousel from '@components/MyCarousel';
import ProductCard from '@components/ProductCard';
import path from 'path';
import markdownToHtml from 'lib/markdownToHTML';

type Props = {
  product?: ProductWithCategory;
  related_products?: ProductWithCategory[];
  htmlContent?: string;
}

export default function SinglePageProduct({product, related_products, htmlContent} : Props) {
  const description = product?.short_description ? product.short_description : ''
  const keywords = 'Trần Gia Phát, đồng phục công nhân, đồng phục áo thun, đồng phục đầu bếp, thiết bị bảo hộ lao động'
  const contact = getContact()
  return (
    <>
      <PageDescription title={product ? product.name : 'Sản phẩm'} description={description} keywords={keywords}/>
      {product && (
        <section className='container'>
          <div className={styles.SinglePageProduct}>
            <img 
              src={product.image ? '/api/images/san-pham/'+ product.image : 'api/images/placeholder.webp'} 
              alt={product.name}
              width={300} height={300}
              className={styles.mainImage}/>
            <div className={styles.productInfo}>
              <h1>{product.name}</h1>
              <p className={styles.available}>CÒN HÀNG</p>
              <p className={styles.price}>{product.price.toLocaleString('en-US')} đ</p>
              {product.short_description && <p className={styles.description}>{product.short_description}</p>}
              <div className={styles.contacts}>
                <Link href='tel:0945316280'>
                  <Image src={home_icon} alt="Icon"/>
                  <div className={styles.contactInfo}>
                    <p>GỌI NGAY {contact.phone}</p>
                    <p>Để đặt hàng</p>
                  </div>
                  {/* <p>Để được tư vấn và đặt hàng</p> */}
                </Link>
              </div>
            </div>
          </div>
          <h1>Mô tả</h1>
          <div dangerouslySetInnerHTML={{ __html: htmlContent || '' }} />
          { related_products && related_products.length > 0 &&
          <>
            <h1>Sản phẩm tương tự</h1>
            <MyCarousel>
              {related_products.map((product) => <ProductCard key={product.id} product={product}/>)}
            </MyCarousel>
          </>
          }
        </section>
      )}
    </>
  );
}

// Config as server side rendering get slug from params
export const getServerSideProps: GetServerSideProps = async ({params}) => {
  const slug = params?.product || '';
  // // Query the category with its top 8 products by slug
  const product = await getOneProductBySlug(slug as string);
  var related_products: Product[] | null = [];
  if (product !== null) {
     related_products = await getManyRelatedProduct(product.categoryId, product?.id)
  }
  const descriptionPath = path.join(process.cwd(), '_posts', 'san-pham', `${product?.slug}.md`);
  const htmlContent = await markdownToHtml(descriptionPath)
  return {
    props: {product, related_products, htmlContent},
    // revalidate: 10,
  };
}