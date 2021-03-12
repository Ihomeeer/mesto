let popup = document.querySelector('.popup');
let openPopupButton = document.querySelector('.profile__edit-button');
let closePopupButton = document.querySelector('.popup__close-button');
let popupOverlay = document.querySelector('.popup__overlay');

function openPopup() {
  popup.classList.add('popup_active');
}

function closePopup() {
  popup.classList.remove('popup_active');
}

openPopupButton.addEventListener('click', openPopup);

closePopupButton.addEventListener('click', closePopup);
popupOverlay.addEventListener('click', closePopup);