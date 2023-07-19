const router = require('express').Router();
const { Joi, celebrate } = require('celebrate');
const userRoutes = require('./user');
const cardRoutes = require('./card');
const { createUser, login } = require('../controllers/users');
const auth = require('../middlewares/auth');
const { urlRegex } = require('../utils/constants');
const NotFoundError = require('../errors/not-found-error');

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(urlRegex),
  }),
}), createUser);

router.get('/signout', auth, (req, res) => {
  res.clearCookie('jwt').send({ message: 'Выход' });
});

router.use('/users', auth, userRoutes);
router.use('/cards', auth, cardRoutes);
router.use('*', auth, (req, res, next) => next(new NotFoundError('Некорректный путь запроса')));

module.exports = router;
