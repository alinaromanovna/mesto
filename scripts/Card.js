export default class Card {
    constructor (name, link, templateSelector) {
        this._name = name;
        this._link = link;
        this._templateSelector = templateSelector
    
        this._makeElements();
        this._setEventListenersCard();
  
    }
     _makeElements() {
      const cardTemplate = document.querySelector(this._templateSelector).content.querySelector('.card');
      this._card = cardTemplate.cloneNode(true);
    
      this._butnLike = this._card.querySelector('.card__button-img_type-like');
      this._butnRemove =  this._card.querySelector('.card__button_type_delete');
      this._cardImg = this._card.querySelector('.card__img');
      this._cardSign = this._card.querySelector('.card__sign');
      
      
      this._cardSign.textContent = this._name;
        this._cardImg.src = this._link;
        this._cardImg.alt = this._name;
      }
  
      _setEventListenersCard () {
  
        this._butnRemove.addEventListener('click', () => {this._deleteCard()});
          
        this._butnLike.addEventListener('click', () => {this._likeCard()});
     
        this._cardImg.addEventListener('click', () => {this._openFoto()});
    
       }
  
   _deleteCard () {
     this._card.remove();
    }
  
    _likeCard () {
     this._butnLike.classList.toggle('card__button-img_type-like-active');
   }
  
   _openFoto () {
     popupOpenFotoImg.src = this._link;
     popupOpenFotoSign.textContent = this._name;
     popupOpenFotoImg.alt = this._name;
     openPopup(popupOpenFoto);
   }
  
   render () {
    return this._card;
  }
  };
