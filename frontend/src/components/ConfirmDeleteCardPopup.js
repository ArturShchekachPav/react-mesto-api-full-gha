import PopupWithForm from './PopupWithForm';

const ConfirmDeleteCardPopup = ({
                                  isOpen,
                                  onClose,
                                  onConfirmDelete
                                }) => {
  function handleSubmit(e) {
    e.preventDefault();

    onConfirmDelete();
  }

  return (
    <PopupWithForm
      name="delete-card"
      title="Вы уверены?"
      isOpen={isOpen}
      onClose={onClose}
      buttonText="Да"
      onSubmit={handleSubmit}
    />
  );
};

export default ConfirmDeleteCardPopup;
