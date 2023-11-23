
import React, { useState } from 'react';
import styles from 'styles/Admin/AdminPage.module.scss';

const AdminPage = () => {
  const [file, setFile] = useState<File>();
  const [method, setMethod] = useState<string>('PATCH');
  const [target, setTarget] = useState<string>('categories');

  const handleFileSelection = (event) => {
    setFile(event.target.files[0]);
  }
  const submitFile = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!file) {
      console.error('No file selected');
      return 
    }
    try {
      const data = new FormData();
      data.set('file', file);
      const res = await fetch(`/api/san-pham/upload?target=${target}`, {
        method: method,
        body: data
      });
      // handle the error
      if (!res.ok) throw new Error(await res.text());
    } catch (e: any) {
      // Handle errors here
      console.error(e);
    } finally {
      // Reset the file input
    }
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <form onSubmit={submitFile} className={styles.form}>
        <input type="file" onChange={(event) => handleFileSelection(event)} />
        <label>
          Method:
          <select value={method} onChange={(event) => setMethod(event.target.value)}>
            {/* <option value="POST">CHỈ TẠO MỚI (KHÔNG CẦN ID)</option> */}
            <option value="PUT">CHỈ CHỈNH SỬA (CẦN ID)</option>
            <option value="PATCH">CHỈNH SỬA VÀ TẠO MỚI</option>
          </select>
        </label>
        <label>
          Đối tượng:
          <select value={target} onChange={(event) => setTarget(event.target.value)}>
            <option value="categories">DANH MỤC SẢN PHẨM</option>
            <option value="products">SẢN PHẨM</option>
          </select>
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AdminPage;
