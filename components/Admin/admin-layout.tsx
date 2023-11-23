
import React from 'react';
import AdminSidebar from './AdminSidebar';
import styles from 'styles/Admin/AdminLayout.module.scss'

const AdminLayout = ({ children }) => {
  return (
    <div className={styles.adminLayout}>
      <AdminSidebar />
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
