import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import styles from '../styles/Navbar.module.scss'
import email_icon from '../public/images/email-icon.svg'
import phone_icon from '../public/images/phone-icon.svg'
import burger_icon from '../public/images/Menu.svg';
import logo from '../public/images/logo.png'

export default function Navbar({openSidebar} : {openSidebar: () => void}) {
  // Get active link
  const router = useRouter()
  const activeLink = router.pathname
  return (
    <header className={styles.header}>
      {/* Header top */}
      <nav className={styles.header__top}>
        <div className={styles.container + ' container'}>  
          <ul className={styles.info}>
            <li>
                <Image src={email_icon} alt="Icon" height={16} />
                bhldtranlinh@gmail.com
            </li>
            <li>
                <Image src={phone_icon} alt="Icon" height={16} />
                0945.316.280</li>
            <li>
              <Image src={email_icon} alt="Icon" height={16} />
              bhldtranlinh@gmail.com
            </li>
          </ul>
          <ul className={styles.navbar__menu}>
                  <li className={`${activeLink === '/' ? styles.active : ''}`}>
                    <Link href='/'>Trang chủ</Link>
                  </li>
                  <li className={`${activeLink.match('/san-pham/*') ? styles.active : ''}`}>
                    <Link href='/san-pham'>Sản phẩm</Link>
                  </li>
                  <li className={`${activeLink === '/gioi-thieu' ? styles.active : ''}`}>
                    <Link href='/gioi-thieu'>Giới thiệu</Link>
                  </li>
          </ul>
        </div>
      </nav>
      {/* Main menu */}
      <nav className={styles.navbar  + ' container'}>
            <div className={styles.navbar__logo}>
              <Image src={logo} alt="Icon" height={100} />
            </div>
            {/* Add list of menu with active links */}
            <ul className={styles.navbar__menu}>
                <li>
                  <Link href='/san-pham'>Đồng phục công nhân</Link>
                </li>
                <li>
                  <Link href='/san-pham'>Áo thun đồng phục</Link>
                </li>
                <li>
                  <Link href='/san-pham'>Thiết bị bảo hộ lao động</Link>
                </li>
            </ul>
            <button className={styles.navbar__toggle} onClick={openSidebar}>
              <Image src={burger_icon} alt="Menu Icon" />
            </button>
      </nav>
    </header>
  )
}
