import CurrentUserContext from '../contexts/CurrentUserContext';
import {useContext} from 'react';

function Card({
                card,
                onCardClick,
                onCardLike,
                onCardDelete
              }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser._id;

  const isLiked = card.likes.some(i => i === currentUser._id);
  const cardLikeButtonClassName = `element__like-button hover ${isLiked && 'element__like-button_active'}`;

  function handleCardClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <article
      className="element"
    >
      <img
        className="element__image"
        src={card.link}
        alt={card.name}
        onClick={handleCardClick}
      />
      <div className="element__info">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__like-container">
          <button
            type="button"
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          ></button>
          <p className="element__like-count">{card.likes.length}</p>
        </div>
      </div>
      {isOwn && <button
        type="button"
        className="element__delete-button hover"
        onClick={handleDeleteClick}
      />}
    </article>
  );
}

export default Card;
