import { Section } from '../components/Section.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithAgree } from '../components/PopupWithAgree.js';
import { Api } from '../components/Api.js';
import { initialCards, config, userData } from '../utils/constants.js'
import './style.css';


const popupEditProfile = document.querySelector('.popup-edit-profile');
const popupContainer = popupEditProfile.querySelector('.popup__container');
const submitEditProfile = popupContainer.querySelector('.form__save-button')
const inputName = popupContainer.querySelector('.form__input_type_name');
const inputAbout = popupContainer.querySelector('.form__input_type_job');
const profile = document.querySelector('.profile');
const profileInfo = profile.querySelector('.profile-info');
const profileAvatar = profile.querySelector('.avatar');
const openPopupEditBtn = profileInfo.querySelector('.profile-info__edit-button');
const profileAddButton = profile.querySelector('.profile__add-button');
const popupAddCard = document.querySelector('.popup-add-card');
const submitAddCard = popupAddCard.querySelector('.form__save-button');
const popupDeleteCard = document.querySelector('.popup-delete-card');
const popupUpdateAvatar = document.querySelector('.popup-change-avatar');
const submitUpdateAvatar = popupUpdateAvatar.querySelector('.form__save-button');

let userId;

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-27',
  headers: {
    authorization: '40975ea0-ac16-4bc6-89f2-023e19f3d474',
    'Content-Type': 'application/json'
  }
});


function createCard(item, userId, templateSelector) {
  const card = new Card(item, userId, templateSelector, {
    handleOpenFoto: (name, link) => {
      popupWithImage.open(name, link);
    },
    handleCardLike: () => {
      const likesCounter = card.likesCounter();
      const sumLike = likesCounter ? api.deleteLike(card.getIdCard()) : api.setLike(card.getIdCard())
      sumLike
        .then(data => {
          card.amountLike(data.likes);
          card.handleLikeClick();
        })
        .catch(err => {
          showErrorMessage(err)
        })
    },
    handleCardDelete: (id, el) => {
      popupWithCardDelete.open(id, el)
    }
  },
    item._id);
  const newCard = card.makeElements();
  return newCard;

}
const userInfo = new UserInfo(userData);

const renderLoading = (submitButton, status) => {
  submitButton.textContent = status;
}

function showErrorMessage(err) {
  console.log(err);
}

const cardSection = new Section(
  (item) => {
    cardSection.addItem(createCard(item, userId, '.card-template'));
  },
  '.cards')

const popupWithCardDelete = new PopupWithAgree({
  popupSelector: '.popup-delete-card',
  onSubmit: (id) => {
    api.deleteCard(id)
      .then(res => {
        popupWithCardDelete.card.remove();
        popupWithCardDelete.close();
      })
      .catch(err => {
        showErrorMessage(err)
      })
  }
})

popupWithCardDelete.setEventListeners();

const popupChangeAvatar = new PopupWithForm({
  popupSelector: '.popup-change-avatar',
  onSubmit: (inputsValue) => {
    renderLoading(submitUpdateAvatar, 'Сохранение...')
    api.updateAvatar(inputsValue['link'])
      .then(() => {
        userInfo.setUserAvatar(inputsValue['link'])
        popupChangeAvatar.close();
      })
      .catch(err =>
        showErrorMessage(err))
      .finally(() => {
        renderLoading(submitUpdateAvatar, 'Сохранить')
      })
  }
})
popupChangeAvatar.setEventListeners();

const popupWithFormEditProfile = new PopupWithForm({
  popupSelector: '.popup-edit-profile',
  onSubmit: (data) => {
    renderLoading(submitEditProfile, 'Сохранение...')
    api.editProfile(data.name, data.about)
      .then(data => {
        userInfo.setUserInfo(data)
        popupWithFormEditProfile.close();
      })
      .catch(err => {
        showErrorMessage(err)
      })
      .finally(() => {
        renderLoading(submitEditProfile, 'Сохранить')
      })
  }

});
popupWithFormEditProfile.setEventListeners();



const popupWithImage = new PopupWithImage('.popup-open-foto');
popupWithImage.setEventListeners();

const addCardPopup = new PopupWithForm({
  popupSelector: '.popup-add-card',
  onSubmit: (data) => {
    renderLoading(submitAddCard, 'Сохранение...')
    api.addNewCard(data.name, data.link)
      .then(data => {
        cardSection.addItem(createCard(data, userId, '.card-template'));
        addCardPopup.close();
      })
      .catch(err => {
        showErrorMessage(err)
      })
      .finally(() => {
        renderLoading(submitAddCard, 'Сохранить')
      })
  }
});
addCardPopup.setEventListeners();

profileAddButton.addEventListener('click', () => {
  addCardPopup.open();
  validationFormAdd.resetValidation();
});

openPopupEditBtn.addEventListener('click', () => {
  const userData = userInfo.getUserInfo()
  inputName.value = userData.name;
  inputAbout.value = userData.about;
  popupWithFormEditProfile.open();
  validationFormEdit.resetValidation();
});

profileAvatar.addEventListener('click', () => {
  popupChangeAvatar.open();
  validationUpdateAvatar.resetValidation();
});

const validationFormEdit = new FormValidator(config, popupEditProfile);
validationFormEdit.enableValidation();

const validationFormAdd = new FormValidator(config, popupAddCard);
validationFormAdd.enableValidation();

const validationUpdateAvatar = new FormValidator(config, popupUpdateAvatar);
validationUpdateAvatar.enableValidation();

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([data, cards]) => {
    userInfo.setUserInfo({
      name: data.name,
      about: data.about,
    })
    userInfo.setUserAvatar(
      data.avatar
    )
    userId = data._id;
    cardSection.renderAll(cards)

  })
  .catch(err => {
    showErrorMessage(err);
  })

