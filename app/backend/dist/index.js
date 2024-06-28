"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// ../app/backend/src/index.ts
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const PORT = 3001;
let allowedOrigin = '';
// Gente, vou fazer um codigo feio, mas diante das dificudades é o jeito.
if (process.env.ALLOWED_ORIGIN === undefined || process.env.ALLOWED_ORIGIN === '') {
    allowedOrigin = 'http://localhost:3000';
}
else {
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
const configureCors = () => {
    return (0, cors_1.default)({
        credentials: true,
        origin: allowedOrigin,
    });
};
const accessControl = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', allowedOrigin);
    // Specify the allowed origin
    res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
};
const configureApp = (app) => {
    app.use(configureCors());
    app.use(express_1.default.json());
    app.use(accessControl);
};
configureApp(app);
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path_1.default.join(__dirname, '../storage/photos'));
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname); // Mantendo o nome original do arquivo
    }
});
const upload = (0, multer_1.default)({ storage });
app.get('/', (req, res) => {
    res.send(`Backend Rodando! E a origem permitida é: ${allowedOrigin}`);
});
app.post('/upload', upload.single('photo'), (req, res) => {
    res.send('Upload realizado com sucesso');
});
app.get('/photos', (req, res) => {
    const photosDirectory = path_1.default.join(__dirname, '../storage/photos');
    fs_1.default.readdir(photosDirectory, (err, files) => {
        if (err) {
            res.status(500).send('Erro ao listar fotos');
            return;
        }
        res.json(files);
    });
});
app.use('/photos', express_1.default.static(path_1.default.join(__dirname, '../storage/photos')));
app.listen(PORT, () => {
    console.log(`Servidor backend rodando na porta ${PORT}`);
});
