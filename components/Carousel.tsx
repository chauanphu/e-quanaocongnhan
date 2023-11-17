// components/ArticleCarousel.js
import Image from 'next/image';
import { useEffect, useState } from 'react';
import styles from '../styles/Carousel.module.scss';
import Link from 'next/link';

const Carousel = ({articles, seconds}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoSlide, setAutoSlide] = useState(true);
  useEffect(() => {
      let timer;
      if (autoSlide) {
        timer = setInterval(() => {
          nextArticle();
        }, seconds * 1000); // Change the article every 3 seconds
      }
      return () => {
        if (timer) {
          clearInterval(timer); // Clear the timer when the component is unmounted
        }
      };
    }, [autoSlide]);
  const nextArticle = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % articles.length);
  };

  const prevArticle = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? articles.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className={styles.carousel}>
      <button className={styles.prevButton} onClick={prevArticle}>
      &#8592;
      </button>
      <div className={styles.articleContainer}>
      <Link href="" className={`${styles.carouselItem}`}>          
          <Image src='' alt='Image' layout='fill' objectFit='cover'/>
          <h2>{articles[currentIndex].title}</h2>
          <p>{articles[currentIndex].description}</p>
        </Link>
      </div>
      <button className={styles.nextButton} onClick={nextArticle}>
      &#8594;
      </button>
    </div>
  );
};

export default Carousel;
