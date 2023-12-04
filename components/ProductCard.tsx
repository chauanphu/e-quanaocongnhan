
import React from 'react';
import styles from '../styles/ProductCard.module.scss';
import Link from 'next/link';

import { Product } from '@prisma/client';
import Image from 'next/image';

interface ProductCardProps {
  product:  Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const link = `/san-pham/${product.categorySlug}/${product.slug}`
  return (
    <>
        {product && <Link key={product.slug} href={link}>
            <div className={styles.ProductCard}>
                {/* <div itemProp="aggregateRating" itemScope itemType="https://schema.org/AggregateRating">
                    <meta itemProp="ratingValue" content="4.5" />
                </div>
                <meta itemProp="name" content={product.name} />
                <link itemProp="image" href={`${process.env.NEXT_PUBLIC_DOMAIN}/api/images/san-pham/${product.image}`} />
                <meta itemProp='description' content={product.short_description ? product.short_description : ''}/> */}
                <Image 
                    className={styles.ProductCard__image} 
                    itemProp="image"
                    src={product.image ? '/api/images/san-pham/'+ product.image : ''}  
                    alt={product.name}
                    width={150}
                    height={150}
                />
                <h2 className={styles.ProductCard__title} itemProp="name">
                    {product.name}
                </h2>
                <p className={styles.ProductCard__price}>{product.price.toLocaleString('en-US')} đ</p>
                {/* <div itemProp="offers" itemScope itemType="https://schema.org/Offer">
                    <meta itemProp="priceCurrency" content="VND" />
                    <meta itemProp="price" content={product.price.toString()} />
                    <meta itemProp="priceValidUntil" content="2022-12-31" />
                    <link itemProp="availability" href="https://schema.org/InStock" />
                </div>
                <meta itemProp="itemCondition" content="https://schema.org/NewCondition" />
                <meta itemProp="sku" content={product.sku} />
                <div itemProp="brand" itemScope itemType="https://schema.org/Brand">
                    <meta itemProp="name" content={product.brand} />
                </div> */}
            </div>
        </Link>}
    </>
  );
};

export default ProductCard;
