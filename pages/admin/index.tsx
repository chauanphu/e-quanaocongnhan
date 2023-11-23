
import axios from 'axios';
import React, { useState } from 'react';
  
const AdminPage = () => {
  const [file, setFile] = useState<File>();
  const [method, setMethod] = useState<string>('POST');
  const [target, setTarget] = useState<string>('/api/san-pham/upload');

  const submitFile = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!file) return;
    try {
      const data = new FormData();
      data.set('file', file);
      const res = await fetch(target, {
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

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <form onSubmit={submitFile}>
        <input type="file" onChange={(event) => setFile(event.target.files?.[0])} />
        <label>
          Method:
          <select value={method} onChange={(event) => setMethod(event.target.value)}>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="PATCH">PATCH</option>
          </select>
        </label>
        <label>
          Target:
          <input type="text" value={target} onChange={(event) => setTarget(event.target.value)} />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AdminPage;
