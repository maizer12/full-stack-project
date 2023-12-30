import { Result, validationResult } from 'express-validator';
import UserModel from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const registration = async (req, res) => {
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
    res.status(500).send('Не удалось заригестрировать аккаунт!');
  }
};
export const login = async (req, res) => {
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
};
export const authMe = async (req, res) => {
  try {
    const user = await UserModel.findOne(req.userId);
    if (!user) {
      return res.status(404).json({
        message: 'Користувач не найден',
      });
    }

    const { passwordHash, ...userData } = await user._doc;

    res.json(userData);
  } catch {
    return res.status(403).json({
      message: 'Нет доступа',
    });
  }
};
