import {Section} from './components/Section.js';
import Card from './components/Card.js';
import FormValidator from './components/FormValidator.js';
import {PopupWithForm} from './components/PopupWithForm.js';
import {UserInfo} from './components/UserInfo.js';
import {PopupWithImage} from './components/PopupWithImage.js'
import {initialCards, config} from './utils/constants.js'
import './pages/style.css';





const popupEditProfile = document.querySelector('.popup-edit-profile');
const popupContainer = popupEditProfile.querySelector('.popup__container');
const inputName = popupContainer.querySelector('.form__input_type_name');
const inputJob = popupContainer.querySelector('.form__input_type_job');
const profile = document.querySelector('.profile');
const profileInfo = profile.querySelector('.profile-info');
const openPopupEditBtn = profileInfo.querySelector('.profile-info__edit-button');
const profileAddButton = profile.querySelector('.profile__add-button');
const popupAddCard = document.querySelector('.popup-add-card');



const userData = {
  name: '.profile-info__title',
  job: '.profile-info__subtitle'
};

const userInfo = new UserInfo(userData);

const cardSection = new Section ({
  items: initialCards,
   renderer: (cardData) => {
    const card = new Card(cardData, '.card-template', (data) => {
        popupWithImage.openPopup(data);
      }
    )
    return card.render();
   }
  },
  '.cards')
  cardSection.renderAll();


const popupWithFormEditProfile = new PopupWithForm({
  popupSelector: '.popup-edit-profile', 
  onSubmit: (data) => {
  userInfo.setUserInfo(data)
  popupWithFormEditProfile.close();
  }
  
}); 
popupWithFormEditProfile.setEventListeners();

openPopupEditBtn.addEventListener('click', () => {
    
  const userData = userInfo.getUserInfo()
  inputName.value = userData.name;
  inputJob.value = userData.job;
  popupWithFormEditProfile.openPopup();
});

const popupWithImage = new PopupWithImage('.popup-open-foto');
popupWithImage.setEventListeners();

const addCardPopup = new PopupWithForm({
  popupSelector: '.popup-add-card', 
  onSubmit: (cardData) => {
    cardSection.addItem(cardData);
    addCardPopup.close();
  }
});

addCardPopup.setEventListeners();
    
profileAddButton.addEventListener('click', () => {
  addCardPopup.openPopup();
});
  
const validationFormEdit = new FormValidator(config, popupEditProfile);
validationFormEdit.enableValidation();

const validationFormAdd = new FormValidator(config, popupAddCard);
validationFormAdd.enableValidation();