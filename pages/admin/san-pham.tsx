import Modal from "@components/Admin/Modal";
import UploadForm from "@components/Admin/UploadForm";
import React, { SetStateAction, useState } from "react";

const ProductDashboard: React.FC = () => {
  const [method, setMethod] = useState<string>("PATCH");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [type, setType] = useState<"success" | "error">("success");

  const [excel, setExcel] = useState<File>();
  const [webp, setWebp] = useState<FileList>();
  const url = "/api/san-pham/upload?target=products"
  
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

  const handleExcelSelection = (event) => {
    // Check if the file's extion is excel
    if (!event.target.files[0].name.endsWith(".xlsx")) {
      // Clear the input
      event.target.value = null;
      console.error("Invalid file type");
      return;
    }
    setExcel(event.target.files[0]);
  };

  const handleWebpSelection = (event) => {
    // Iterate and validate all files are webp
    [...event.target.files].forEach((file) => {
      if (!file.name.endsWith(".webp")) {
        // Clear the input
        event.target.value = null;
        popModal("Invalid file type", "error");
        return;
      }
    });
    setWebp(event.target.files);
  };

  const submitExcel = async (event: React.FormEvent<HTMLFormElement>) => {
    popModal("Đang tải file excel lên...", "success")
    event.preventDefault();
    if (!excel) {
      popModal("No file selected", "error");
      return;
    }
    try {
      const data = new FormData();
      data.set("file", excel);
      const res = await fetch(url, {
        method: method,
        body: data,
      });
      // handle the error
      if (!res.ok) {
        const message = await res.text();
        popModal(message, "error");
        return;
      } else {
        popModal("Tải file excel thành công", "success");
      };
    } catch (e: any) {
      // Handle errors here
      popModal(e, "error");
    }
  };

  const submitWebp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    popModal("Đang tải hình ảnh lên...", "success");
    if (!webp) {
      popModal("No file selected", "error");
      return;
    }
    try {
      const data = new FormData();
      for (var i = 0; i < webp.length; i++) {
        data.append("images", webp[i]);
      }
      const res = await fetch(url, {
        method: "POST",
        body: data,
      });
      // handle the error
      if (!res.ok) {
        const message = await res.text();
        popModal(message, "error");
        return;
      } else {
        popModal("Tải hình ảnh thành công", "success");
      };
    } catch (e: any) {
      // Handle errors here
      popModal(e, "error")
    }
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <UploadForm
        title="Upload Excel"
        type=".xlsx"
        onSubmitFile={submitExcel}
        handleFileSelection={handleExcelSelection}
      >
        <label>
          Method:
          <select
            value={method}
            onChange={(event) => setMethod(event.target.value)}
          >
            {/* <option value="POST">CHỈ TẠO MỚI (KHÔNG CẦN ID)</option> */}
            <option value="PUT">CHỈ CHỈNH SỬA (CẦN ID)</option>
            <option value="PATCH">CHỈNH SỬA VÀ TẠO MỚI</option>
          </select>
        </label>
      </UploadForm>

      <UploadForm
        title="Upload Hình ảnh"
        type=".webp"
        onSubmitFile={submitWebp}
        handleFileSelection={handleWebpSelection}
      />
      {showModal && <Modal message={message} type={type} onClose={() => setShowModal(false)}/>}
    </div>
  );
};

export default ProductDashboard;
