
import PageDescription from '@components/page-description';
import { GetServerSideProps } from 'next';
import { getOneProductBySlug } from 'lib/query'
import { Product } from '@prisma/client';
import Image from 'next/image';
import styles from 'styles/SinglePageProduct.module.scss'
import Link from 'next/link';
import { getContact } from 'lib/utils';
import home_icon from 'public/images/home-icon.svg'
import Section from '@components/Section';

type Props = {
  product?: Product
}

export default function SinglePageProduct({product} : Props) {
  const description = 'Trần Gia Phát chuyên may mặc đồng phục công nhân, đồng phục áo thun, đồng phục đầu bếp, thiết bị bảo hộ lao động,...'
  const keywords = 'Trần Gia Phát, đồng phục công nhân, đồng phục áo thun, đồng phục đầu bếp, thiết bị bảo hộ lao động'
  const contact = getContact()
  return (
    <>
      <PageDescription title='Sản phẩm' description={description} keywords={keywords}/>
      {product && (
        <section className='container'>
          <div className={styles.SinglePageProduct}>
            <Image 
              src={product.image ? '/api/images/san-pham/'+ product.image : '/images/placeholder.png'} 
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
        </section>
      )}
    </>
  );
}

// Config as server side rendering get slug from params
export const getServerSideProps: GetServerSideProps = async ({params}) => {
  const slug = params?.product || '';
  console.log(slug)
  // // Query the category with its top 8 products by slug
  const product = await getOneProductBySlug(slug as string);
  return {
    props: {product},
    // revalidate: 10,
  };
}