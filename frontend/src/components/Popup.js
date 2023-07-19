import {useEffect} from 'react';

const Popup = ({
                 isOpen,
                 onClose,
                 containerElement: Component,
                 containerClass,
                 children
               }) => {

  useEffect(() => {
    if (!isOpen) return;

    function handleEscape(e) {
      if (e.key === 'Escape') {
        onClose();
      }
    }

    document.addEventListener('keydown',
      handleEscape
    );

    return () => {
      document.removeEventListener('keydown',
        handleEscape
      );
    };

  }, [isOpen])

  return (
    <section
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      className={`popup popup_type_info-tooltip ${isOpen ?
        ' popup_opened' :
        ''}`}
    >
      <Component className={containerClass}>
        {children}
        <button
          aria-label="Закрыть"
          type="button"
          className="popup__close-button hover"
          onClick={onClose}
        ></button>
      </Component>
    </section>
  );
};

export default Popup;
