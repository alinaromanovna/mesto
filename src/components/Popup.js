export class Popup {
    constructor(popupSelector) {
      this.popupSelector = popupSelector
      this.popup = document.querySelector(popupSelector)
    }

    _handleEscClose (evt) {
      if (evt.key === 'Escape') {
        evt.preventDefault()
        this.closePopup ();
      };
    }
    
    openPopup () {
        this.popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose.bind(this));   
    }
    
    closePopup () {
        this.popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose.bind(this));
    }

    setEventListeners() {
      this.popup.addEventListener(('click'), (evt) => {
        if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-button')) {
          this.closePopup();
        }
      });
    }

}