import React from 'react';
import Link from 'next/link'
import Image from 'next/image'
// Icons
import home_icon from '../public/images/home-icon.svg'
import zalo_icon from '../public/images/zalo-icon.svg'


// Import styling
import styles from '../styles/Sidebar.module.scss'
// import User from 'models/User';
import { useRouter } from 'next/router';
import data from "../data.json"

type SidebarProps = {
    open?: boolean;
    onSelection: (pageName: string) => void;
    handleClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ open = false, onSelection, handleClose }) => {
    const router = useRouter()
    const activeLink = router.pathname
    const pages = [
        {
        "name": "Trang chủ",
        "link": "/",
        "image": home_icon
        },
        {
        "name": "Sản phẩm",
        "link": "/san-pham",
        "image": home_icon
        }
    ]
    return (
        <>
            <div className={`${styles.sidebar} ${open ? styles.open : styles.close}`}>
                <div className={styles.logo}><h2>Đồng phục Trần Gia Phát</h2></div>
                <div className={styles.links}>
                    {pages.map((page, index) => (
                        <Link 
                            key={index} 
                            href={page.link} 
                            className={`${activeLink === page.link ? styles.active : ''}`}
                            onClick={()=> {
                            // handleClose();
                            onSelection(page.name) 
                            }}>
                            <Image src={page.image} alt='Icon'/>{page.name}
                        </Link>
                    ))}
                </div>
                {/* This is contact info */}
                <div className={styles.bottom}>
                    <h3>Liên hệ</h3>
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