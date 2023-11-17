
import React from 'react';
import styles from '../styles/ProductCard.module.scss';
import Image from 'next/image';
import Link from 'next/link';
interface Product {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
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
    <div>
        <Link href={'/san-pham/' + category.url} className={styles.title}>
            <h2>{category.name}</h2>
        </Link>
        <div className={styles.product__list}>
            {
                products ? products.map((product) => (
                    <Link href={'/san-pham/' + product.id}>
                        <div className={styles.ProductCard}>
                            <Image className={styles.ProductCard__image} 
                            src={product.imageUrl} 
                            alt={product.name}
                            width={20}/>
                            <h3 className={styles.ProductCard__title}>{product.name}</h3>
                            <p className={styles.ProductCard__price}>{product.price.toLocaleString('en-US')} đ</p>
                        </div>
                    </Link>
                )) : 
                <p>Sản phẩm đang được cập nhật</p>
            }
        </div>
        {/* <div className={styles.ProductCard}>
        <Image src={imageUrl} alt={name} placeholder='blur'/>
        <h3>{name}</h3>
        <p>{price}</p>
        </div> */}
    </div>
  );
};

export default ProductCard;
