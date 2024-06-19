// src/index.ts
import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const app = express();
const port = 4001;

// Configuração do multer para armazenamento de fotos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'storage/photos/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

// Middleware para permitir CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Rota para carregar uma foto
app.post('/upload', upload.single('photo'), (req, res) => {
  res.send('Foto carregada com sucesso!');
});

// Rota para listar todas as fotos
app.get('/photos', (req, res) => {
  const directoryPath = path.join(__dirname, '../storage/photos');
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      return res.status(500).send('Erro ao listar fotos');
    }
    res.send(files);
  });
});

// Rota para servir uma foto específica
app.get('/photos/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, '../storage/photos', filename);
  res.sendFile(filePath);
});

// Iniciando o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
