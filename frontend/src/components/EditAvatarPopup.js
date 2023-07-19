import PopupWithForm from './PopupWithForm';
import {
  useEffect,
  useRef
} from 'react';

const EditAvatarPopup = ({
                           onClose,
                           isOpen,
                           onUpdateAvatar,
                           isLoading
                         }) => {
  const inputRef = useRef(null);

  useEffect(() => {
      inputRef.current.value = null;
    },
    [isOpen]
  );

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: inputRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name="edit-avatar"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      buttonText={isLoading ?
        'Сохранение...' :
        'Сохранить'}
      onSubmit={handleSubmit}
    >
      <div className="popup__form-item">
        <input
          type="url"
          name="avatarLinkInput"
          id="avatar-link-input"
          className="popup__input popup__input_avatar_link"
          placeholder="Ссылка на картинку"
          required
          ref={inputRef}
        />
        <span className="popup__error avatar-link-input-error"></span>
      </div>
    </PopupWithForm>
  );
};

export default EditAvatarPopup;
