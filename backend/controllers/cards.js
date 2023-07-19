const Card = require('../models/card');
const NotFoundError = require('../errors/not-found-error');
const IncorrectRequestError = require('../errors/incorrect-request-error');
const ForbiddenError = require('../errors/forbidden-error');
const { CREATED_CODE } = require('../utils/constants');

const getCards = (req, res, next) => Card.find({})
  .sort({ createdAt: -1 })
  .then((cards) => res.send(cards))
  .catch(next);

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const _id = req.user;

  return Card.create({ name, link, owner: _id })
    .then((newCard) => res.status(CREATED_CODE).send(newCard))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new IncorrectRequestError('Переданы некорректные данные при создании карточки'));
      } else {
        next(err);
      }
    });
};

const deleteCardById = (req, res, next) => {
  const { cardId } = req.params;

  return Card.findById(cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Запрашиваемая карточка не найдена');
      }

      if (card.owner.toString() !== req.user._id) {
        throw new ForbiddenError('Это не ваша карточка');
      }

      return Card.findByIdAndDelete(cardId).then((deletedCard) => res.send(deletedCard));
    }).catch((err) => {
      if (err.name === 'CastError') {
        next(new IncorrectRequestError('Переданы некорректные данные для удаления карточки'));
      } else {
        next(err);
      }
    });
};

const likeCard = (req, res, next) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
  { new: true },
).then((card) => {
  if (!card) {
    throw new NotFoundError('Запрашиваемая карточка не найдена');
  }

  return res.send(card);
}).catch((err) => {
  if (err.name === 'CastError') {
    next(new IncorrectRequestError('Переданы некорректные данные для постановки лайка'));
  }

  next(err);
});

const dislikeCard = (req, res, next) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } },
  { new: true },
).then((card) => {
  if (!card) {
    throw new NotFoundError('Запрашиваемая карточка не найдена');
  }

  return res.send(card);
}).catch((err) => {
  if (err.name === 'CastError') {
    next(new IncorrectRequestError('Переданы некорректные данные для cнятия лайка'));
  } else {
    next(err);
  }
});

module.exports = {
  getCards,
  createCard,
  deleteCardById,
  likeCard,
  dislikeCard,
};
