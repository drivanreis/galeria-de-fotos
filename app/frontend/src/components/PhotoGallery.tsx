// ../app/frontend/src/components/PhotoGallery.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './PhotoGallery.css';

// const backEndURL = process.env.BACKEND_URL
const backEndURL = 'http://localhost:3001'
console.log(backEndURL);
const backEndUrlFotos = `${backEndURL}/photos`;

const PhotoGallery: React.FC = () => {
  const [photos, setPhotos] = useState<string[]>([]);

  const fetchPhotos = async () => {
    try {
      const response = await axios.get<string[]>(backEndUrlFotos);
      setPhotos(response.data);
    } catch (error) {
      console.log('Erro ao buscar fotos:', error);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  return (
    <div className="photo-gallery">
    {photos.map((photo, index) => (
        <img
        key={index}
        src={`${backEndUrlFotos}/${photo}`}
        alt={`Foto ${index + 1}`}
        />
    ))}
    </div>
  );
};

export default PhotoGallery;
