import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import { registerValidate } from './validations/auth.js';
import { Result, validationResult } from 'express-validator';
import UserModel from './models/User.js';

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

app.post('/auth/login', async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    const isValidPassword = await bcrypt.compare(req.body.password.toString(), user._doc.passwordHash.toString());

    if (!isValidPassword) {
      return res.status(400).json({
        message: 'Логин или пароль не верный',
      });
    }

    const { passwordHash, ...userData } = await user._doc;

    const token = jwt.sign({ id: user._id }, 'secret123', { expiresIn: '30d' });
    res.json({ userData, token });
  } catch {
    res.status(400).json({ message: 'Неудалось авторизоватся' });
  }
});

app.post('/auth/registration', registerValidate, async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array());
  }

  const { fullName, email, password } = req.body;

  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password.toString(), salt.toString());

    const user = new UserModel({
      fullName,
      email,
      passwordHash: hash,
    });

    const savedUser = await user.save();
    const { passwordHash, ...userData } = await savedUser._doc;

    const token = jwt.sign({ id: savedUser._id }, 'secret123', { expiresIn: '30d' });
    res.json({ userData, token });
  } catch (error) {
    console.log('Registration error:', error);
    res.status(500).send('Internal Server Error');
  }
});

const PORT = 4444;
app.listen(PORT, (err) => {
  if (err) {
    return console.error('Ошибка при запуске сервера:', err);
  }
  console.log(`Сервер запущен на порту ${PORT}`);
});
