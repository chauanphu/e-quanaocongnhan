import React from 'react';
import Link from 'next/link'
import { useRouter } from 'next/router';
import Image from 'next/image'

// Icons
import styles from '../styles/Sidebar.module.scss'
import phone_icon from '../public/images/phone-icon.png'
import zalo_icon from '../public/images/zalo-icon.svg'

// import User from 'models/User';
import { CategoryWithSub } from 'lib/prisma';

import { getContact, getPages, isPageActive } from 'lib/utils';
import { Category } from '@prisma/client';

type SidebarProps = {
    open?: boolean;
    onSelection: () => void;
    handleClose: () => void;
    categories?: CategoryWithSub[];
}

// const getImageStaticImport = (image: string) => {
//     return require(`../public/images/${image}`)
// }

type LinkGeneratorProps = {
    subPages?: CategoryWithSub[] | Category[];
    onSelection: () => void;
}

function LinkGenerator({subPages, onSelection}: LinkGeneratorProps) {
    return (
        <>
            {subPages && subPages.map((subPage, index) => (
                <div key={index} className={styles.linkGroup}>
                    <span key={subPage.slug} className={`${styles.link} ${styles.subLink} `}>
                        <Link 
                            key={index} 
                            href={'/san-pham/' + subPage.slug} 
                            onClick={()=> {
                            onSelection() 
                            }}>
                            {subPage.name}
                        </Link>
                    </span>
                    {   subPage.children &&
                        <LinkGenerator subPages={subPage.children} onSelection={onSelection}/>
                    }
                </div>
            ))}
        </>
    );
}

const Sidebar: React.FC<SidebarProps> = ({ open = false, onSelection, handleClose, categories }) => {
    const router = useRouter()
    const activeLink = router.pathname
    var pages = getPages()
    pages['2'].subPages = categories
    const contact = getContact()
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
                                    onSelection() 
                                    }}>
                                    {page.name}
                                </Link>
                                {page.subPages && 
                                    <button type='button'>&#9660;</button>
                                }
                            </span>
                            <LinkGenerator subPages={page.subPages} onSelection={onSelection}/>
                        </div>
                        
                    ))}
                </div>
                {/* This is contact info */}
                <div className={styles.bottom}>
                    <Link href='tel:0945316280'>
                        <Image src={phone_icon} alt="Icon"/> {contact.phone.display}
                    </Link>
                    <Link href='https://zalo.me/0945316280' rel="noopener noreferrer" target="_blank">
                        <Image src={zalo_icon} height={20} alt="Icon"/> {contact.phone.display}
                    </Link>
                </div>
            </div>
            {open && <div className={styles.sidebar__cover} onClick={handleClose} />}
        </>
    );
}

export default Sidebar;