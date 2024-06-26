// ../app/frontend/src/components/UploadPhoto.tsx
import React, { useState } from 'react';
import axios from 'axios';

// const backEndURL = process.env.BACKEND_URL
const backEndURL = 'http://localhost:3001'

const UploadPhoto: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('photo', file);

    try {
      await axios.post(`${backEndURL}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      window.location.reload();
    } catch (error) {
      console.error('Erro ao carregar a foto:', error);
      alert('Erro ao carregar a foto');
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default UploadPhoto;
