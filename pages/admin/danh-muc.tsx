
import Modal from '@components/Admin/Modal';
import UploadForm from '@components/Admin/UploadForm';
import React, { SetStateAction, useState } from 'react';

const CategoryDashboard: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [type, setType] = useState<"success" | "error">("success");

  const [method, setMethod] = useState<string>('PATCH');
  const [excel, setExcel] = useState<File>();
  const url = "/api/san-pham/upload?target=categories"

  const handleExcelSelection = (event) => {
    // Check if the file's extion is excel
    if (!event.target.files[0].name.endsWith('.xlsx')) {
      popModal("Invalid file type", "error");
      return;
    }
    setExcel(event.target.files[0]);
  }

  const popModal = (message: string, type: SetStateAction<"success" | "error">) => {
    setShowModal(true);
    setMessage(message);
    setType(type);
    const timer = setTimeout(() => {
      setShowModal(false)
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }

  const submitExcel = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    popModal("Đang tải file excel lên...", "success")
    if (!excel) {
      popModal("No file selected", "error");
      return 
    }
    try {
      const data = new FormData();
      data.set('file', excel);
      const res = await fetch(url, {
        method: method,
        body: data
      });
      // handle the error
      if (!res.ok){
        const text = await res.text()
        popModal(text, "error")
        return
      } else {
        popModal("Upload thành công", "success")
      };
    } catch (e: any) {
      // Handle errors here
      popModal(e.message, "error")
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
      const res = await fetch(url, {
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
        {showModal && <Modal message={message} type={type} onClose={() => setShowModal(false)}/>}
    </div>
  );
};

export default CategoryDashboard;
