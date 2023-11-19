import React from 'react';
import Link from 'next/link'
import Image from 'next/image'
import data from 'data.json'

// Icons
import home_icon from '../public/images/home-icon.svg'
import zalo_icon from '../public/images/zalo-icon.svg'
import { Category } from '@prisma/client';

// Import styling
import styles from '../styles/Sidebar.module.scss'
// import User from 'models/User';
import { useRouter } from 'next/router';
import { CategoryWithSub } from 'lib/prisma';

type SidebarProps = {
    open?: boolean;
    onSelection: (pageName: string) => void;
    handleClose: () => void;
    categories?: CategoryWithSub[];
}

// const getImageStaticImport = (image: string) => {
//     return require(`../public/images/${image}`)
// }

type Page = {
    name: string;
    link: string;
    image?: string;
    subPages?: CategoryWithSub[];
}

/**
 * A function returns true if the page is active
 * It will match all the subpages of the page
 * @param activeLink 
 * @param pageLink 
 * @returns 
 */
const isPageActive = (activeLink: string, pageLink: string) => {
    if (pageLink === '/') return activeLink === pageLink
    if (activeLink.match(pageLink + '*')) return true
    // console.log(activeLink, pageLink)
    return false
}

const Sidebar: React.FC<SidebarProps> = ({ open = false, onSelection, handleClose, categories }) => {
    const router = useRouter()
    const activeLink = router.pathname
    var pages = data['main-nav'] as Page[]
    pages['2'].subPages = categories
    return (
        <>
            <div className={`${styles.sidebar} ${open ? styles.open : styles.close}`}>
                <div className={styles.links}>
                    {pages.map((page, index) => (
                        <div key={index}>
                            <span className={`${styles.link} ${isPageActive(activeLink, page.link) ? styles.active : ''}`}>
                                <Link 
                                    href={page.link} 
                                    onClick={()=> {
                                    // handleClose();
                                    onSelection(page.name) 
                                    }}>
                                    {page.name}
                                </Link>
                                {page.subPages && 
                                    <button type='button'>&#9660;</button>
                                }
                            </span>
                            {page.subPages && page.subPages.map((subPage, index) => (
                                <span key={subPage.id} className={`${styles.link} ${styles.subLink} `}>
                                    <Link 
                                        key={index} 
                                        href={page.link + subPage.slug} 
                                        onClick={()=> {
                                        // handleClose();
                                        onSelection(subPage.name) 
                                        }}>
                                        {subPage.name}
                                    </Link>
                                </span>
                            ))}
                        </div>
                        
                    ))}
                </div>
                {/* This is contact info */}
                <div className={styles.bottom}>
                    <Link href='tel:0945316280'>
                        <Image src={home_icon} alt="Icon"/> {data['contact'].phone}
                    </Link>
                    <Link href='https://zalo.me/0945316280' rel="noopener noreferrer" target="_blank">
                        <Image src={zalo_icon} height={20} alt="Icon"/> {data['contact'].phone}
                    </Link>
                </div>
            </div>
            {open && <div className={styles.sidebar__cover} onClick={handleClose} />}
        </>
    );
}

export default Sidebar;