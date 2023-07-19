import Popup from './Popup';

function ImagePopup({
                      card,
                      onClose
                    }) {
  return (
    <Popup
      isOpen={card.link}
      onClose={onClose}
      containerElement="figure"
      containerClass="popup__figure"
    >
      <img
        className="popup__image"
        src={card.link || '#'}
        alt={card.name || ''}
      />
    </Popup>
  );
}

export default ImagePopup;
