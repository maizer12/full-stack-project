import express from 'express';
import mongoose from 'mongoose';
import { registerValidate, loginValidate, postCreateValidation } from './validation.js';
import checkAuth from './utils/checkAuth.js';
import { authMe, login, registration } from './controllers/UserController.js';
import * as PostController from './controllers/PostController.js';

mongoose
  .connect('mongodb+srv://admin:admin@cluster0.yxbofd6.mongodb.net/blog')
  .then(() => {
    console.log('OK');
  })
  .catch(() => console.log('Err'));

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello12456');
});

app.post('/auth/registration', registerValidate, registration);
app.post('/auth/login', loginValidate, login);
app.get('/auth/me', checkAuth, authMe);

app.get('/posts', PostController.getAll);
app.post('/posts', checkAuth, postCreateValidation, PostController.create);

const PORT = 4444;
app.listen(PORT, (err) => {
  if (err) {
    return console.error('Ошибка при запуске сервера:', err);
  }
  console.log(`Сервер запущен на порту ${PORT}`);
});
