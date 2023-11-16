import React from 'react';
import Link from 'next/link'
import Image from 'next/image'

// Icons
import home_icon from '../public/images/home-icon.svg'
import courseregis_icon from 'assets/images/Course.svg'
import calendar_icon from 'assets/images/Calender.svg'
import exam_icon from 'assets/images/Bookmark.svg'
import fee_icon from 'assets/images/Money.svg'
import program_icon from 'assets/images/Program.svg'
import marks_icon from 'assets/images/ListCheck.svg'
import prequesite_icon from 'assets/images/Layer.svg'
import profile_icon from 'assets/images/Profile.svg'
// Import styling
import styles from '../styles/Sidebar.module.scss'
// import User from 'models/User';
import { useRouter } from 'next/router';

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
            </div>
            {open && <div className={styles.sidebar__cover} onClick={handleClose} />}
        </>
    );
}

export default Sidebar;