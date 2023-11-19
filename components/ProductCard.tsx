
import React from 'react';
import styles from '../styles/ProductCard.module.scss';
import Image from 'next/image';
import Link from 'next/link';

import { Product, Category } from '@prisma/client';
import path from 'path';

interface ProductCardProps {
  products: Product[];
  category: Category;
  hasTitle?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ products, category, hasTitle=true }) => {
  return (
    <>
        {(hasTitle && category) && <Link href={'/san-pham/' + category.slug} className={styles.title}>
            <h2>{category.name}</h2>
        </Link>}
        <div className={styles.product__list}>
            {
                products && products.length > 0 ? products.map((product) => (
                    <Link key={product.id} href={`/san-phan/${category.slug}/${product.slug}`} itemScope itemType="https://schema.org/Product">
                        <div className={styles.ProductCard}>
                            <meta itemProp="name" content={product.name} />
                            <link itemProp="image" href="https://example.com/photos/16x9/photo.jpg" />
                            <meta itemProp='description' content={product.short_description ? product.short_description : ''}/>
                            <Image 
                                className={styles.ProductCard__image} 
                                itemProp="image"
                                src={product.image ? '/api/images/san-pham/'+ product.image : '/images/placeholder.png'}  
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
                    </Link>
                )) : 
                <p>Sản phẩm đang được cập nhật</p>
            }
        </div>
    </>
  );
};

export default ProductCard;
