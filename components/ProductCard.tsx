
import React from 'react';
import styles from '../styles/ProductCard.module.scss';
import Image from 'next/image';
import Link from 'next/link';
interface Product {
    id: number;
    sku: string;
    name: string;
    price: number;
    imageUrl: string;
    short_description: string;
    brand: string;
    // category: Category;
}
interface Category {
    id: number;
    name: string;
    url: string;
}
interface ProductCardProps {
  products: Product[];
  category: Category;
}

const ProductCard: React.FC<ProductCardProps> = ({ products, category }) => {
  return (
    <>
        <Link href={'/san-pham/' + category.url} className={styles.title}>
            <h2>{category.name}</h2>
        </Link>
        <div className={styles.product__list}>
            {
                products ? products.map((product) => (
                    <Link key={product.id} href={'/san-pham/' + product.id} itemScope itemType="https://schema.org/Product">
                        <div className={styles.ProductCard}>
                            <meta itemProp="name" content={product.name} />
                            <link itemProp="image" href="https://example.com/photos/16x9/photo.jpg" />
                            <meta itemProp='description' content={product.short_description}/>
                            <Image className={styles.ProductCard__image} itemProp="image"
                            src={product.imageUrl}  
                            alt={product.name}
                            width={20}/>
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
                            <div itemProp="brand" itemScope itemType="https://schema.org/Brand">
                                <meta itemProp="name" content={product.brand} />
                            </div>
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
