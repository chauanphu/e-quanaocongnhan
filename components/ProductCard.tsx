
import React from 'react';
import styles from '../styles/ProductCard.module.scss';
import Image from 'next/image';
import Link from 'next/link';

import { Product } from '@prisma/client';

interface ProductCardProps {
  product: Product;
  parentSlug: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, parentSlug }) => {
  return (
    <>
        {product && <Link key={product.id} href={`/san-pham/${parentSlug}/${product.slug}`} itemScope itemType="https://schema.org/Product">
            <div className={styles.ProductCard}>
                <meta itemProp="name" content={product.name} />
                <link itemProp="image" href="https://example.com/photos/16x9/photo.jpg" />
                <meta itemProp='description' content={product.short_description ? product.short_description : ''}/>
                <Image 
                    className={styles.ProductCard__image} 
                    itemProp="image"
                    src={product.image ? '/api/images/san-pham/'+ product.image : '/images/placeholder.png'}  
                    alt={product.name}
                    priority={false}
                    width={150}
                    height={150}
                />
                <h3 className={styles.ProductCard__title} itemProp="name">
                    {product.name}
                </h3>
                <p className={styles.ProductCard__price}>{product.price.toLocaleString('en-US')} đ</p>
                <div itemProp="offers" itemScope itemType="https://schema.org/Offer">
                    <meta itemProp="priceCurrency" content="VND" />
                    <meta itemProp="price" content={product.price.toString()} />
                    <link itemProp="availability" href="https://schema.org/InStock" />
                    <meta itemProp="itemCondition" content="https://schema.org/NewCondition" />
                </div>
                <meta itemProp="sku" content={product.sku} />
                {/* <div itemProp="brand" itemScope itemType="https://schema.org/Brand">
                    <meta itemProp="name" content={product.brand} />
                </div> */}
            </div>
        </Link>}
    </>
  );
};

export default ProductCard;
