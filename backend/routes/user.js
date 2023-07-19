const router = require('express').Router();
const { Joi, celebrate } = require('celebrate');
const {
  getUsers, getUserById, updateProfile, updateAvatar, getMyProfileData,
} = require('../controllers/users');
const { urlRegex } = require('../utils/constants');

router.get('/', getUsers);
router.get('/me', getMyProfileData);
router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24).hex().required(),
  }),
}), getUserById);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateProfile);
router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(urlRegex),
  }),
}), updateAvatar);

module.exports = router;
