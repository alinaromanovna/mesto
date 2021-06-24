
import Card from './Card.js';
import FormValidator from './FormValidator.js';

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const config = {
      formSelector: '.form',
      inputSelector: '.form__input',
      submitButtonSelector: '.form__save-button',
      inputErrorClass: 'form__input_type_error',
      errorClass: 'form__input_type_error-active',
     }; 


const popupEditProfile = document.querySelector('.popup-edit-profile');
const popupContainer = popupEditProfile.querySelector('.popup__container');
const inputName = popupContainer.querySelector('.form__input_type_name');
const inputJob = popupContainer.querySelector('.form__input_type_job');
const closeEditPopupBtn = popupContainer.querySelector('.popup__close-button');
const profile = document.querySelector('.profile');
const profileInfo = profile.querySelector('.profile-info');
const openPopupEditBtn = profileInfo.querySelector('.profile-info__edit-button');
const profileName = profileInfo.querySelector('.profile-info__title');
const profileJob = profileInfo.querySelector('.profile-info__subtitle');
const cardsList = document.querySelector('.cards');

const profileAddButton = profile.querySelector('.profile__add-button');
const popupAddCard = document.querySelector('.popup-add-card');
const popupAddCardContainer = popupAddCard.querySelector('.popup__container');
const popupAddCardForm = popupAddCardContainer.querySelector('.form');
const addCardInputName = popupAddCardContainer.querySelector('.form__input_type_name');
const addCardInputLink = popupAddCardContainer.querySelector('.form__input_type_link');
const addCardSaveButton = popupAddCardContainer.querySelector('.form__save-button');
const closeAddCardPopupBtn = popupAddCardContainer.querySelector('.popup__close-button');
const popupOpenFoto = document.querySelector('.popup-open-foto');
const popupOpenFotoImg = popupOpenFoto.querySelector('.popup-open-foto__img');
const popupOpenFotoSign = popupOpenFoto.querySelector('.popup-open-foto__figcaption');
const popupOpenFotoCloseBtn = popupOpenFoto.querySelector('.popup__close-button');


class Popup {
  constructor(popupSelector) {
    this.popupSelector = popupSelector
  }
  _handleEscClose (evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault()
      const popupOpened = document.querySelector('.popup_opened');
      closePopup (popupOpened);
    };
  }
  
  openPopup () {
      this.popupSelector.classList.add('popup_opened');
      document.addEventListener('keydown', this._handleEscClose );   
  }
  
  closePopup () {
      this.popupSelector.classList.remove('popup_opened');
      document.removeEventListener('keydown', this._handleEscClose );
  }
  setEventListeners() {
    this.popupSelector.querySelector('.popup__close-button').addEventListener(('click'), () => {
      this.closePopup.bind(this.popupSelector);
    } )
  }
}

// function checkEscExit (evt) {
//   if (evt.key === 'Escape') {
//     evt.preventDefault()
//     const popupOpened = document.querySelector('.popup_opened');
//     closePopup (popupOpened);
//   };
// }

// function openPopup (modal) {
//     modal.classList.add('popup_opened');
//     document.addEventListener('keydown', checkEscExit );   
// }

// function closePopup (modal) {
//     modal.classList.remove('popup_opened');
//     document.removeEventListener('keydown', checkEscExit );
// }

function handlerSubmitForm(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  closePopup(popupEditProfile);
}

openPopupEditBtn.addEventListener('click', function() {
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
  openPopup(popupEditProfile);
});

function handleOpenPhoto(name, link) {
  popupOpenFotoImg.src = link;
     popupOpenFotoSign.textContent = name;
     popupOpenFotoImg.alt = name;
     openPopup(popupOpenFoto);
}

function addCard(item) {
  cardsList.prepend(renderCard(item));
}

function resetInputs(form) {
  form.reset();
}

function addCardForm (evt) {
  evt.preventDefault();
  const inputValue = addCardInputName.value
  const inputLink = addCardInputLink.value

  addCard({name: inputValue, link: inputLink})
  closePopup(popupAddCard);
  resetInputs(popupAddCardForm);
}

popupContainer.addEventListener('submit', handlerSubmitForm);
profileAddButton.addEventListener('click', () => openPopup(popupAddCard));
popupAddCardContainer.addEventListener('submit', addCardForm);
 
function renderCard(data) {
 const card = new Card(data, '.card-template', handleOpenPhoto)
    return card.render();
};

initialCards.forEach (function(currentItem) { 
    const newCard = renderCard(currentItem);
    cardsList.append(newCard);
 });

 function handlerClickPopupOverlay(evt) {
  const popupOpened = document.querySelector('.popup_opened');
  if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-button')) {
    closePopup(popupOpened);
  }
}

popupEditProfile.addEventListener('mousedown', handlerClickPopupOverlay);
popupAddCard.addEventListener('mousedown', handlerClickPopupOverlay);
popupOpenFoto.addEventListener('mousedown', handlerClickPopupOverlay);

const validationFormEdit = new FormValidator(config, popupEditProfile);
validationFormEdit.enableValidation();

const validationFormAdd = new FormValidator(config, popupAddCard);
validationFormAdd.enableValidation();