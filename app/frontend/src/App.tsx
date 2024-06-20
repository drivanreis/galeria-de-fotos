// ../app/frontend/src/App.tsx
import React from 'react';
import './App.css';
import PhotoGallery from './components/PhotoGallery';
import UploadPhoto from './components/UploadPhoto';

const App: React.FC = () => {
  
  return (
    <div className="App">
      <h1>Galeria de Fotos</h1>
      <PhotoGallery />
      <UploadPhoto />
    </div>
  );
}

export default App;
