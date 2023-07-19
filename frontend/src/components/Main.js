import {useContext} from 'react';
import Card from './Card';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Main({
                onCardClick,
                onAddPlace,
                onEditProfile,
                onEditAvatar,
                onCardLike,
                cards,
                onCardDelete
              }) {

  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="main page__main">
      <section className="profile">
        <div
          className="profile__avatar-button"
          onClick={onEditAvatar}
        >
          <img
            className="profile__avatar"
            src={currentUser.avatar}
            alt="Фото профиля"
          />
        </div>
        <div className="profile__info">
          <div className="profile__header">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              aria-label="Редактировать"
              className="profile__edit-button hover"
              type="button"
              onClick={onEditProfile}
            ></button>
          </div>
          <p className="profile__job">{currentUser.about}</p>
        </div>
        <button
          aria-label="Добавить"
          className="profile__add-button hover"
          type="button"
          onClick={onAddPlace}
        ></button>
      </section>
      <section className="elements main__elements">
        {cards.map((card) => (
          <Card
            card={card}
            onCardClick={onCardClick}
            key={card._id}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
