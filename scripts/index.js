let popup = document.querySelector('.popup');
let popupContainer = document.querySelector('.popup__container');
let inputName = popupContainer.querySelector('.form__input-name');
let inputJob = popupContainer.querySelector('.form__input-job');
let saveButton = popupContainer.querySelector('.form__save-button');
let closePopupBtn = popupContainer.querySelector('.popup__close-button');
let profile = document.querySelector('.profile');
let profileInfo = profile.querySelector('.profile-info');
let openPopupBtn = profileInfo.querySelector('.profile-info__edit-button');
let profileName = profileInfo.querySelector('.profile-info__title');
let profileJob = profileInfo.querySelector('.profile-info__subtitle');


function openPopup () {
    inputName.value = profileName.textContent;
    inputJob.value = profileJob.textContent;
    popup.classList.add('popup_opened');
    
}

function closePopup () {
    popup.classList.remove('popup_opened');
}

openPopupBtn.addEventListener('click', openPopup);

function formSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileJob.textContent = inputJob.value;
    closePopup();
  }

closePopupBtn.addEventListener('click', closePopup);
popupContainer.addEventListener('submit', formSubmitHandler);


