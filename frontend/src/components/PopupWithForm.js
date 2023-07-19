import Popup from './Popup';

function PopupWithForm({
                         name,
                         title,
                         onClose,
                         isOpen,
                         buttonText,
                         children,
                         onSubmit
                       }) {

  return (
    <Popup
      isOpen={isOpen}
      onClose={onClose}
      containerElement="div"
      containerClass="popup__container"
    >
      <h2 className="popup__title">{title}</h2>
      <form
        name={name}
        className={`popup__form popup__form_${name}`}
        noValidate
        onSubmit={onSubmit}
      >
        {children}
        <button
          type="submit"
          className="popup__button"
        >{buttonText}
        </button>
      </form>
    </Popup>
  );
}

export default PopupWithForm;
