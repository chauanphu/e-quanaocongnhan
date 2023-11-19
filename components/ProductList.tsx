
import React from 'react';
import styles from '../styles/ProductList.module.scss';
import Link from 'next/link';

import { Product, Category } from '@prisma/client';
import ProductCard from './ProductCard';
import MyCarousel from './MyCarousel';

interface ProductCardProps {
  products: Product[];
  category: Category;
  hasTitle?: boolean;
  isCarousel?: boolean;
}

const ProductList: React.FC<ProductCardProps> = ({ products, category, hasTitle=true, isCarousel=true }) => {
  return (
    <>
        {(hasTitle && category) && <Link href={'/san-pham/' + category.slug} className={styles.title}>
            <h2>{category.name}</h2>
        </Link>}
        {isCarousel ? 
          <MyCarousel seconds={5}>
            {
                products && products.length > 0 ? products.map((product) => (
                    <ProductCard key={product.id} parentSlug={category.slug} product={product}/>
                )) : 
                <p>Sản phẩm đang được cập nhật</p>
            }
          </MyCarousel>
        :
        <div className={styles.product__list}>
            {
                products && products.length > 0 ? products.map((product) => (
                    <ProductCard key={product.id} parentSlug={category.slug} product={product}/>
                )) : 
                <p>Sản phẩm đang được cập nhật</p>
            }
        </div>
        }
    </>
  );
};

export default ProductList;
