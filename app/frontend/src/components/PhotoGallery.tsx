// src/components/PhotoGallery.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './PhotoGallery.css';

const PhotoGallery: React.FC = () => {
  const [photos, setPhotos] = useState<string[]>([]);

  const fetchPhotos = async () => {
    try {
      const response = await axios.get<string[]>('http://localhost:4001/photos');
      setPhotos(response.data);
    } catch (error) {
      console.error('Erro ao buscar fotos:', error);
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
        src={`http://localhost:4001/photos/${photo}`}
        alt={`Foto ${index + 1}`}
        />
    ))}
    </div>
  );
};

export default PhotoGallery;
