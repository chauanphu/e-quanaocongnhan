
import UploadForm from '@components/Admin/UploadForm';
import React, { useState } from 'react';

const CategoryDashboard: React.FC = () => {
  const [method, setMethod] = useState<string>('PATCH');
  const [excel, setExcel] = useState<File>();

  const handleExcelSelection = (event) => {
    // Check if the file's extion is excel
    if (!event.target.files[0].name.endsWith('.xlsx')) {
      console.error('Invalid file type');
      return;
    }
    setExcel(event.target.files[0]);
  }


  const submitExcel = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!excel) {
      console.error('No file selected');
      return 
    }
    try {
      const data = new FormData();
      data.set('file', excel);
      const res = await fetch(`/api/san-pham/upload?target=categoires}`, {
        method: method,
        body: data
      });
      // handle the error
      if (!res.ok) throw new Error(await res.text());
    } catch (e: any) {
      // Handle errors here
      console.error(e);
    }
  };
  const submitWebp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!excel) {
      console.error('No file selected');
      return 
    }
    try {
      const data = new FormData();
      data.set('images', excel);
      const res = await fetch(`/api/images/san-pham?target=categoires}`, {
        method: "POST",
        body: data
      });
      // handle the error
      if (!res.ok) throw new Error(await res.text());
    } catch (e: any) {
      // Handle errors here
      console.error(e);
    }
  }  
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <UploadForm 
        title="Upload Excel"
        type=".xlsx"
        onSubmitFile={submitExcel} 
        handleFileSelection={handleExcelSelection}>
          <label>
            Method:
            <select value={method} onChange={(event) => setMethod(event.target.value)}>
              {/* <option value="POST">CHỈ TẠO MỚI (KHÔNG CẦN ID)</option> */}
              <option value="PUT">CHỈ CHỈNH SỬA (CẦN ID)</option>
              <option value="PATCH">CHỈNH SỬA VÀ TẠO MỚI</option>
            </select>
          </label>
        </UploadForm>
    </div>
  );
};

export default CategoryDashboard;
