const popupEditProfile = document.querySelector('.popup-edit-profile');
const popupContainer = popupEditProfile.querySelector('.popup__container');
const inputName = popupContainer.querySelector('.form__input_type_name');
const inputJob = popupContainer.querySelector('.form__input_type_job');
const saveButton = popupContainer.querySelector('.form__save-button');
const closeEditPopupBtn = popupContainer.querySelector('.popup__close-button');
const profile = document.querySelector('.profile');
const profileInfo = profile.querySelector('.profile-info');
const openPopupEditBtn = profileInfo.querySelector('.profile-info__edit-button');
const profileName = profileInfo.querySelector('.profile-info__title');
const profileJob = profileInfo.querySelector('.profile-info__subtitle');


function openEditPopup () {
    inputName.value = profileName.textContent;
    inputJob.value = profileJob.textContent;
    popupEditProfile.classList.add('popup_opened');
    
}

function closeEditPopup () {
    popupEditProfile.classList.remove('popup_opened');
}

openPopupEditBtn.addEventListener('click', openEditPopup);

function formSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileJob.textContent = inputJob.value;
    closeEditPopup();
  }

closeEditPopupBtn.addEventListener('click', closeEditPopup);
popupContainer.addEventListener('submit', formSubmitHandler);




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

  const cardsList = document.querySelector('.cards')
  const cardTemplate = document.querySelector('.card-template').content
  const cardItem = cardTemplate.querySelector('.card')
  const buttonLike = cardTemplate.querySelector('.card__button_type_like')
  const ButtonLikeActive = buttonLike.querySelector('.card__button-img')
  const profileAddButton = profile.querySelector('.profile__add-button')
  const popupAddCard = document.querySelector('.popup-add-card')
  const popupAddCardContainer = popupAddCard.querySelector('.popup__container');
  const addCardInputName = popupAddCardContainer.querySelector('.form__input_type_name');
  const addCardInputLink = popupAddCardContainer.querySelector('.form__input_type_link');
  const addCardSaveButton = popupAddCardContainer.querySelector('.form__save-button');
  const closeAddCardPopupBtn = popupAddCardContainer.querySelector('.popup__close-button');
  const deleteButton = cardTemplate.querySelector('.card__button_type_delete')



  
  function insertListItem(item) {
  const card = cardTemplate.querySelector('.card').cloneNode(true)
  card.querySelector('.card__sign').textContent = item.name
  card.querySelector('.card__img').src = item.link
  

  cardsList.append(card)
};

initialCards.forEach (function(item) { 
    insertListItem(item);
 });


function openPopupAddCard () {
    popupAddCard.classList.add('popup_opened');
    
}
function closePopupAddCard () {
    popupAddCard.classList.remove('popup_opened');
}
profileAddButton.addEventListener('click', openPopupAddCard);

function addCard(item) {
    cardsList.prepend(insertListItem(item));
  }

function formAddCard (evt) {
    evt.preventDefault();
    const inputValue = addCardInputName.value
    const inputLink = addCardInputLink.value

    addCard(inputValue, inputLink)
    closeEditPopup();
  }


closeAddCardPopupBtn.addEventListener('click', closePopupAddCard);
popupAddCardContainer.addEventListener('submit', formAddCard);




  
  function  like (evt) {
    evt.target.classList.toggle(card__button_type_like_active);
  }

  buttonLikeActive.addEventListener('click', like);

  deleteButton.addEventListener('click', function(){
    evt.target.closest(cardItem).remove();
})

