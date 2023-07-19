import PopupWithForm from './PopupWithForm';
import {
  useEffect,
  useState
} from 'react';

const AddPlacePopup = ({
                         isOpen,
                         onClose,
                         onAddPlace,
                         isLoading
                       }) => {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  useEffect(() => {
      setLink('');
      setName('');
    },
    [isOpen]
  );

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace(name,
      link
    );
  }

  return (
    <PopupWithForm
      name="add-card"
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
      buttonText={isLoading ?
        'Сохранение...' :
        'Создать'}
      onSubmit={handleSubmit}
    >
      <div className="popup__form-item">
        <input
          type="text"
          name="titleInput"
          id="title-input"
          className="popup__input popup__input_card_title"
          placeholder="Название"
          minLength="2"
          maxLength="30"
          required
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <span className="popup__error title-input-error"></span>
      </div>
      <div className="popup__form-item">
        <input
          type="url"
          name="linkInput"
          id="link-input"
          className="popup__input popup__input_card_link"
          placeholder="Ссылка на картинку"
          required
          value={link}
          onChange={(e) => {
            setLink(e.target.value);
          }}
        />
        <span className="popup__error link-input-error"></span>
      </div>
    </PopupWithForm>
  );
};

export default AddPlacePopup;
