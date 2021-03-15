let popup = document.querySelector('.popup');
let openPopupButton = document.querySelector('.profile__edit-button');
let closePopupButton = popup.querySelector('.popup__close-button');
let popupOverlay = document.querySelector('.popup__overlay');
let defaultName = document.querySelector('.profile__name');
let defaultJob = document.querySelector('.profile__function');
let formElement = document.querySelector('.popup__main-form');
let nameInput = formElement.querySelector('.popup__name');
let jobInput = formElement.querySelector('.popup__function');
let saveButton = document.querySelector('.popup__close-button');



function openPopup() {
  popup.classList.add('popup_opened');
  nameInput.value = defaultName.textContent;
  jobInput.value = defaultJob.textContent;
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
  evt.preventDefault();
  defaultName.textContent = nameInput.value;
  defaultJob.textContent = jobInput.value;
  closePopup();
}

openPopupButton.addEventListener('click', openPopup);

closePopupButton.addEventListener('click', closePopup);

popupOverlay.addEventListener('click', closePopup);

formElement.addEventListener('submit', formSubmitHandler);