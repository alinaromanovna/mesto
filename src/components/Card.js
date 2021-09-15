export class Card {

  constructor(item, userId, templateSelector, { handleOpenFoto, handleCardLike, handleCardDelete }, cardId) {
    this._name = item.name;
    this._link = item.link;
    this._like = item.likes;
    this._ownerId = item.owner._id;
    this._userId = userId;
    this._templateSelector = templateSelector;
    this._handleCardLike = handleCardLike;
    this._handleCardDelete = handleCardDelete;
    this._handleOpenFoto = handleOpenFoto;
    this._cardId = cardId;

  }
  makeElements() {
    const cardTemplate = document.querySelector(this._templateSelector).content.querySelector('.card');
    this._card = cardTemplate.cloneNode(true);

    this._butnLike = this._card.querySelector('.card__button-img_type-like');
    this._likeCounter = this._card.querySelector('.counter-like')
    this._butnRemove = this._card.querySelector('.card__button_type_delete');
    this._cardImg = this._card.querySelector('.card__img');
    this._cardSign = this._card.querySelector('.card__sign');

    if (this._ownerId !== this._userId) {
      this._butnRemove.remove();
    }

    this._cardSign.textContent = this._name;
    this._cardImg.src = this._link;
    this._cardImg.alt = this._name;

    this._setEventListenersCard();
    this._handleCardLike();


    return this._card

  };
  _setEventListenersCard() {
    this._butnRemove.addEventListener('click', () => { this._handleCardDelete() });
    this._butnLike.addEventListener('click', () => { this._handleCardLike() });
    this._cardImg.addEventListener('click', () => { this._handleOpenFoto(this._name, this._link) });
  };

  getIdCard() {
    return this._cardId;
  }


  deleteCard() {
    this._card.remove();
    this._card = null;
  };

  likesCounter() {
    return this._like.some(item => {
      return item._id === this._userId;
    })
  }

  handleLikeClick() {
    this._likeCounter.textContent = this._like.length;
    if (this.likesCounter(this._userId)) {
      this._butnLike.classList.add('card__button-img_type-like-active');

    }

    else {
      this._butnLike.classList.remove('card__button-img_type-like-active');
    }
  };

  amountLike(number) {
    this._like = number;

  }
};
