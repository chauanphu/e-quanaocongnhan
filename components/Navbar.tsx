import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import styles from '../styles/Navbar.module.scss'
import email_icon from '../public/images/email-icon.svg'
import phone_icon from '../public/images/phone-icon.svg'
import home_icon from '../public/images/home-icon.svg'
import burger_icon from '../public/images/Menu.svg'
import logo from '../public/images/logo.png'
import StructuredData from './structured-data'
import { CategoryWithSub } from 'lib/prisma'
import { isPageActive, getPages, getContact } from 'lib/utils'

export default function Navbar({openSidebar, categories} : {openSidebar: () => void, categories: CategoryWithSub[]}) {
  // Get active link
  const router = useRouter()
  const activeLink = router.pathname
  // Copy pages from data then remove the 'San phẩm' page
  const pages = getPages()
  // Remove 'San phẩm' page
  // pages = pages.filter((page: Page) => page.name != 'Sản phẩm')
  const contacts = getContact()
  
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [{
      "@type": "ListItem",
      position: 1,
      name: "Trang chủ",
      item: "https://quanaocongnhan.com/"
    }],
  };
  
  return (
    <>
      <StructuredData data={structuredData}/>
      <header className={styles.header}>
        {/* Header top */}
        <nav className={styles.header__top}>
          <div className={styles.container + ' container'}>  
            <ul className={styles.info}>
              <li>
                  <Image src={email_icon} alt="Icon" height={16} />
                  {contacts.email}
              </li>
              <li>
                  <Image src={phone_icon} alt="Icon" height={16} />
                  {contacts.phone}
              </li>
              <li>
                <Image src={home_icon} alt="Icon" height={16} />
                {contacts.address}
              </li>
            </ul>
            <ul className={styles.navbar__menu}>
              {pages && pages.map((page, index) => (
                <li key={index} className={`${isPageActive(activeLink, page.link) ? styles.active : ''}`}>
                  <Link href={page.link}>{page.name}</Link>
                </li>
              ))}
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
                  {categories && categories.map((category) => (
                    <li key={category.id}>
                      <Link href={`/san-pham/${category.slug}`}>{category.name}</Link>
                    </li>
                  ))}
              </ul>
              <button className={styles.navbar__toggle} onClick={openSidebar}>
                <Image src={burger_icon} alt="Menu Icon" />
              </button>
        </nav>
      </header>
    </>
  )
}