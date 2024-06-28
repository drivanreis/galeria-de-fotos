// ../app/frontend/src/App.tsx
import React from 'react';
import './App.css';
import PhotoGallery from './components/PhotoGallery';
import UploadPhoto from './components/UploadPhoto';

const App: React.FC = () => {

  let backEndURL = '';

  if (import.meta.env.BACKEND_URL === undefined || import.meta.env.BACKEND_URL === '') {
    backEndURL = 'http://localhost:3001';
  } else {
    backEndURL = import.meta.env.BACKEND_URL;
  }
  
  return (
    <div className="App">
      <h1>Galeria de Fotos</h1>
      <p>{`Pegando dados de ${backEndURL}`}</p>
      <PhotoGallery />
      <UploadPhoto />
    </div>
  );
}

export default App;
