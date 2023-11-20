
import React from 'react';
import styles from '../styles/ProductCard.module.scss';
import Image from 'next/image';
import Link from 'next/link';

import { ProductWithCategory } from 'lib/prisma';
import { Product } from '@prisma/client';

interface ProductCardProps {
  product: ProductWithCategory | Product;
  parentSlug?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, parentSlug }) => {
    const link = parentSlug ? `/san-pham/${parentSlug}/${product.slug}` : `/san-pham/${(product as ProductWithCategory).category.slug}/${product.slug}`
  return (
    <>
        {product && <Link key={product.id} href={link} itemScope itemType="https://schema.org/Product">
            <div className={styles.ProductCard}>
                <meta itemProp="name" content={product.name} />
                <link itemProp="image" href={`${process.env.NEXT_PUBLIC_DOMAIN}/api/images/san-pham/${product.image}`} />
                <meta itemProp='description' content={product.short_description ? product.short_description : ''}/>
                <img 
                    className={styles.ProductCard__image} 
                    itemProp="image"
                    src={product.image ? '/api/images/san-pham/'+ product.image : ''}  
                    alt={product.name}
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
