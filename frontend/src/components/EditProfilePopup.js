import {
  useState,
  useContext,
  useEffect
} from 'react';
import PopupWithForm from './PopupWithForm';
import CurrentUserContext from '../contexts/CurrentUserContext';

const EditProfilePopup = ({
                            isOpen,
                            onClose,
                            onUpdateUser,
                            isLoading
                          }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
      setName(currentUser.name);
      setDescription(currentUser.about);
    },
    [currentUser, isOpen]
  );

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="profile-edit"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      buttonText={isLoading ?
        'Сохранение...' :
        'Сохранить'}
      onSubmit={handleSubmit}
    >
      <div className="popup__form-item">
        <input
          type="text"
          name="nameInput"
          id="name-input"
          className="popup__input popup__input_profile_name"
          placeholder="Имя"
          minLength="2"
          maxLength="40"
          required
          value={name || ''}
          onChange={(e) => setName(e.target.value)}
        />
        <span className="popup__error name-input-error"></span>
      </div>
      <div className="popup__form-item">
        <input
          type="text"
          name="jobInput"
          id="job-input"
          className="popup__input popup__input_profile_job"
          placeholder="О себе"
          minLength="2"
          maxLength="200"
          required
          value={description || ''}
          onChange={(e) => setDescription(e.target.value)}
        />
        <span className="popup__error job-input-error"></span>
      </div>
    </PopupWithForm>
  );
};

export default EditProfilePopup;
