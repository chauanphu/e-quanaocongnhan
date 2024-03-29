import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import styles from '../styles/Navbar.module.scss'
import email_icon from '../public/images/email-icon.svg'
import phone_icon from '../public/images/phone-icon.svg'
import home_icon from '../public/images/home-icon.svg'
import burger_icon from '../public/images/Menu.svg'
import logo from '../public/images/logo.png'
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

  // const structuredData = {
  //   '@context': 'https://schema.org',
  //   '@type': 'BreadcrumbList',
  //   itemListElement: [{
  //     "@type": "ListItem",
  //     position: 1,
  //     name: "Trang chủ",
  //     item: "https://quanaocongnhan.com/"
  //   },
  //   {
  //     "@type": "ListItem",
  //     position: 1,
  //     name: "Giới thiệu",
  //     item: "https://quanaocongnhan.com/gioi-thieu"
  //   },
  //   {
  //     "@type": "ListItem",
  //     position: 1,
  //     name: "Sản phẩm",
  //     item: "https://quanaocongnhan.com/san-pham"
  //   }
  // ],
  // };
  
  const categoriesGenerator = () => {
    return (
      <>
        {categories.map((category) => (
          <li className={styles.navItems + ' ' + styles.navDropdown} key={category.slug}>
            <Link href={`/san-pham/${category.slug}`}>{category.name}</Link>
            {category.children && category.children.length > 0 && (
              <>
                <span className={styles.cavet}>&#9660;</span>
                <ul className={styles.dropdown}>
                  {category.children.map((childCategory) => (
                    <li key={childCategory.slug}>
                      <Link href={`/san-pham/${childCategory.slug}`}>{childCategory.name}</Link>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </li>
        ))}
      </>
    );
  };

  return (
    <>
      {/* <StructuredData data={structuredData}/> */}
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
                  {contacts.phone.display}
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
            <Link href="/"><Image src={logo} alt="Icon" height={100} /></Link>
          </div>
          {/* Add list of menu with active links */}
          <ul className={styles.navbar__menu}>
              {categories && categoriesGenerator()}
          </ul>
          <button className={styles.navbar__toggle} onClick={openSidebar}>
            <Image src={burger_icon} alt="Menu Icon" />
          </button>
        </nav>
      </header>
    </>
  )
}