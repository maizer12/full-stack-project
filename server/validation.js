import { body } from 'express-validator';

export const loginValidate = [
  body('email', 'Неверный форамт почты').isEmail(),
  body('password', 'Пароль указан не коректно').isLength({ min: 5 }),
];

export const registerValidate = [
  body('email', 'Неверный форамт почты').isEmail(),
  body('password', 'Пароль указан не коректно').isLength({ min: 5 }),
  body('fullName', 'Имя пользователя не конектно').isLength({ min: 5 }),
  body('avatarUrl', 'Проверьте правильность добавленой силки').optional().isURL(),
];

export const postCreateValidation = [
  body('title', 'Введите заголовок статьи').isLength({ min: 3 }).isString(),
  body('text', 'Введите текст статьи').isLength({ min: 3 }).isString(),
  body('tags', 'Неверный формат тэгов').optional().isString(),
  body('imageUrl', 'Неверная ссылка на изображение').optional().isString(),
];
