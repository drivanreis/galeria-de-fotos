// ../app/backend/src/index.ts
import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import cors from 'cors';

const app = express();
const PORT = 3001;

let allowedOrigin = '';

// Gente, vou fazer um codigo feio, mas diante das dificudades é o jeito.
if (process.env.ALLOWED_ORIGIN === undefined || process.env.ALLOWED_ORIGIN === '') {
  allowedOrigin = 'http://localhost:3000';
} else {
  allowedOrigin = process.env.ALLOWED_ORIGIN;
}
// eu quero ver o que foi definido como origem permitida
console.log(allowedOrigin);

// // Middleware para permitir CORS
// app.use((_req, res, next) => {
//   res.header('Access-Control-Allow-Origin', 'http://localhost:3000/photos');
//   res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   next();
// });



const configureCors = (): express.RequestHandler => {
  return cors({
    credentials: true,
    origin: allowedOrigin,
  }
  );
};

const accessControl: express.RequestHandler = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', allowedOrigin);
  // Specify the allowed origin
  res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
};

const configureApp = (app: express.Application): void => {
  app.use(configureCors());
  app.use(express.json());
  app.use(accessControl);
 };

configureApp(app);




const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../storage/photos'));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Mantendo o nome original do arquivo
  }
});

const upload = multer({ storage });


app.get('/', (req, res) => {
  res.send(`Backend Rodando! E a origem permitida é: ${allowedOrigin}`);
});

app.post('/upload', upload.single('photo'), (req, res) => {
  res.send('Upload realizado com sucesso');
});

app.get('/photos', (req, res) => {

  const photosDirectory = path.join(__dirname, '../storage/photos');
  fs.readdir(photosDirectory, (err, files) => {
    if (err) {
      res.status(500).send('Erro ao listar fotos');
      return;
    }
    res.json(files);
  });
});

app.use('/photos', express.static(path.join(__dirname, '../storage/photos')));

app.listen(PORT, () => {
  console.log(`Servidor backend rodando na porta ${PORT}`);
});
