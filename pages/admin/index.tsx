
import axios from 'axios';
import React, { useState } from 'react';
  
const AdminPage = () => {
  const [file, setFile] = useState<File>();

  const submitFile = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!file) return
    try {
      const data = new FormData()
      data.set('file', file)
      console.log(data)
      const res = await fetch('/api/san-pham/upload', {
        method: 'POST',
        body: data
      })
      // handle the error
      if (!res.ok) throw new Error(await res.text())
    } catch (e: any) {
      // Handle errors here
      console.error(e)
    }
  };

  return (
    <div>
      <h1>Welcome to the Admin Page</h1>
      <form onSubmit={submitFile}>
      <input type="file" onChange={(event) => setFile(event.target.files?.[0])} />
      <button type="submit">Submit</button>
    </form>
    </div>
  );
};

export default AdminPage;
