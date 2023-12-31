const router = require('express').Router();
const {
  celebrate, Joi,
} = require('celebrate');

const {
  getUsers,
  getUser,
  getUserMe,
  patchUser,
} = require('../controllers/users');
const { USER_VALIDATION_OBJECT_NOT_REQUIRED } = require('../utils/constants');

router.get('/', getUsers);
router.get('/me', getUserMe);
router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24).hex().required(),
  }).unknown(true),
}), getUser);
router.patch('/me', celebrate(USER_VALIDATION_OBJECT_NOT_REQUIRED), patchUser);
router.patch('/me/avatar', celebrate(USER_VALIDATION_OBJECT_NOT_REQUIRED), patchUser);

module.exports = router;
