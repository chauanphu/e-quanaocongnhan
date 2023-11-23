import React, { useState } from 'react';
import styles from 'styles/Admin/UploadForm.module.scss';
interface UploadForm {
  // target as enum of 'categories' | 'products'
    title: string;
    type: string;
    onSubmitFile: (event: React.FormEvent<HTMLFormElement>) => void;
    handleFileSelection: (event: React.ChangeEvent<HTMLInputElement>) => void;
    children?: React.ReactNode;
}

const UploadForm: React.FC<UploadForm> = ({title, type, onSubmitFile, handleFileSelection, children}) => {
  const isMultiple = type === '.webp';
  return (
    <div>
      <h2>{title}</h2>
      <form onSubmit={onSubmitFile} className={styles.form}>
        <input multiple={isMultiple} type="file" accept={type} onChange={(event) => handleFileSelection(event)} />
        {children}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UploadForm;
