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
      inputErrorClass: '.form__input_type_error',
      errorClass: '.form__input_type_error-active',
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
const cardTemplate = document.querySelector('.card-template').content;
const cardItem = cardTemplate.querySelector('.card');
const buttonLike = cardTemplate.querySelector('.card__button_type_like');
const buttonLikeActive = buttonLike.querySelector('.card__button-img');
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


function checkEscExit (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault()
    const popupOpened = document.querySelector('.popup_opened');
    closePopup (popupOpened);
  };
}

function openPopup (modal) {
    modal.classList.add('popup_opened');
    document.addEventListener('keydown', checkEscExit );   
}

function closePopup (modal) {
    modal.classList.remove('popup_opened');
    document.removeEventListener('keydown', checkEscExit );
}

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

function addCard(item) {
  cardsList.prepend(insertListItem(item));
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
  addCardSaveButton.disabled = 'true';
}

closeEditPopupBtn.addEventListener('click', () => closePopup(popupEditProfile));

popupContainer.addEventListener('submit', handlerSubmitForm);

profileAddButton.addEventListener('click', () => openPopup(popupAddCard));

closeAddCardPopupBtn.addEventListener('click', () => closePopup(popupAddCard));

popupAddCardContainer.addEventListener('submit', addCardForm);
 

  function insertListItem(item) {

  const card = cardTemplate.querySelector('.card').cloneNode(true);
  const cardSign = card.querySelector('.card__sign');
  const cardImg = card.querySelector('.card__img');
  const butnLike = card.querySelector('.card__button-img_type-like');

    cardSign.textContent = item.name;
    cardImg.src = item.link;
    cardImg.alt = item.name;
  
   card.querySelector('.card__button_type_delete').addEventListener('click', function(evt){
     evt.target.closest('.card').remove();
    })
    
    butnLike.addEventListener('click', function() {
      butnLike.classList.toggle('card__button-img_type-like-active');
    })

    cardImg.addEventListener('click', function(evt) {
      popupOpenFotoImg.src = item.link;
      popupOpenFotoSign.textContent = item.name;
      popupOpenFotoImg.alt = item.name;
      openPopup(popupOpenFoto);
    });

    return card;
};

initialCards.forEach (function(currentItem) { 
    const newCard = insertListItem(currentItem);
    cardsList.append(newCard);
 });

 popupOpenFotoCloseBtn.addEventListener('click', () => closePopup(popupOpenFoto));




 function handlerClickPopupOverlay(evt) {
  const popupOpened = document.querySelector('.popup_opened');
  if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-button')) {
    closePopup(popupOpened);
  }
}

popupEditProfile.addEventListener('mousedown', handlerClickPopupOverlay);
popupAddCard.addEventListener('mousedown', handlerClickPopupOverlay);
popupOpenFoto.addEventListener('mousedown', handlerClickPopupOverlay);




enableValidation(config);
