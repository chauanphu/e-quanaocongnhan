import UploadForm from "@components/Admin/UploadForm";
import React, { useState } from "react";

const ProductDashboard: React.FC = () => {
  const [method, setMethod] = useState<string>("PATCH");
  const [excel, setExcel] = useState<File>();
  const [webp, setWebp] = useState<FileList>();
  const url = "/api/san-pham/upload?target=products"

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
        console.error("Invalid file type");
        return;
      }
    });
    setWebp(event.target.files);
  };

  const submitExcel = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!excel) {
      console.error("No file selected");
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
      if (!res.ok) throw new Error(await res.text());
    } catch (e: any) {
      // Handle errors here
      console.error(e);
    }
  };
  const submitWebp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!webp) {
      console.error("No file selected");
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
      if (!res.ok) throw new Error(await res.text());
    } catch (e: any) {
      // Handle errors here
      console.error(e);
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
    </div>
  );
};

export default ProductDashboard;
