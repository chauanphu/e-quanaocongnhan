
import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/CTO.module.scss';

import phone_icon from '../public/images/call-animated.gif';
import facebook_icon from '../public/images/facebook-icon.gif';
import zalo_icon from '../public/images/zalo-icon.gif';

const CTO = () => {
  const buttons = [
    {
      imageSrc: phone_icon,
      buttonText: '0945.316.280',
      buttonLink: 'tel:0945316280',
      background: true,

    },
    {
      imageSrc: facebook_icon,
      buttonText: 'Facebook',
      buttonLink: 'https://www.facebook.com/dongphuctrangiaphat',
      background: false,
    },
    {
      imageSrc: zalo_icon,
      buttonText: '0945.316.280',
      buttonLink: 'https://zalo.me/0945316280',
      background: false,
    },
  ];

  return (
    <div className={styles.cto__buttons}>
      {buttons.map((button, index) => (
        <Link key={index} 
            href={button.buttonLink} 
            className={`${styles.cto__button} ${button.background ? styles.with__background : ''}`}
            rel="noopener noreferrer" target="_blank"
        >
          <span>{button.buttonText}</span>
          <Image src={button.imageSrc} alt="Icon" height={35}/>
        </Link>
        
      ))}
    </div>
  );
};

export default CTO;
