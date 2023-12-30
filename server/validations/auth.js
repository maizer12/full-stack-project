import { body } from 'express-validator';

export const registerValidate = [
  body('email', 'Неверный фонрамт почты').isEmail(),
  body('password', 'Пароль указан не коректно').isLength({ min: 5 }),
  body('fullName', 'Имя пользователя не конектно').isLength({ min: 5 }),
  body('avatarUrl', 'Проверьте правильность добавленой силки').optional().isURL(),
];
