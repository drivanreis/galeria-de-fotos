// ../app/backend/src/index.ts
import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const app = express();
const PORT = 4001;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../storage/photos'));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Mantendo o nome original do arquivo
  }
});

const upload = multer({ storage });

// Middleware para permitir CORS
app.use((_req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4000');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.post('/upload', upload.single('photo'), (req, res) => {
  res.send('Upload realizado com sucesso');
});

app.get('/photos', (req, res) => {
  const photosDirectory = path.join(__dirname, '../../storage/photos');
  fs.readdir(photosDirectory, (err, files) => {
    if (err) {
      res.status(500).send('Erro ao listar fotos');
      return;
    }
    res.json(files);
  });
});

app.use('/photos', express.static(path.join(__dirname, '../../storage/photos')));

app.listen(PORT, () => {
  console.log(`Servidor backend rodando na porta ${PORT}`);
});
