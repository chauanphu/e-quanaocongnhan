
import { useRouter } from 'next/router';
import styles from 'styles/Admin/AdminSidebar.module.scss'

import React from 'react';
import Link from 'next/link';
import { getAdminPages, isPageActive } from 'lib/utils';

type SidebarProps = {
    open?: boolean;
    onSelection: () => void;
    handleClose: () => void;
}

const AdminSidebar: React.FC = ({ open = true }:SidebarProps) => {
const router = useRouter()
const activeLink = router.pathname
const pages = getAdminPages();
  return (
    <div className={`${styles.sidebar} ${open ? styles.open : styles.close}`}>
      <div className={styles.links}>
            {pages && pages.map((page, index) => (
                <div key={index}>
                    <span className={`${styles.link} ${isPageActive(activeLink, page.link) ? styles.active : ''}`}>
                        <Link 
                            href={page.link} 
                            onClick={()=> {
                            }}>
                            {page.name}
                        </Link>
                    </span>
                </div>
            ))}
        </div>
    </div>
  );
};

export default AdminSidebar;
