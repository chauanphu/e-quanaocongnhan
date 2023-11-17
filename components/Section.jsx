import Image from 'next/image';
import styles from '../styles/Section.module.scss';

export default function Section({ title, image, contrast_bg, children }) {
    return (        
        <div className={`${styles.section}`}>
            <h1 className={styles.section__title}>
                <Image className={styles.section__icon} src={image} />
                {title}
            </h1>
            <div className={`${contrast_bg ? styles.active : ''} ${styles.wrapper}`}>
                <section className={`${styles.section__content} container`}>
                    {children}
                </section>
            </div>
        </div>
    );
}
