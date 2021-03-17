let popup = document.querySelector('.popup');
let openPopupButton = document.querySelector('.profile__edit-button');
let closePopupButton = popup.querySelector('.popup__close-button');
let popupOverlay = popup.querySelector('.popup__overlay');
let defaultName = document.querySelector('.profile__name');
let defaultJob = document.querySelector('.profile__function');
let formElement = document.querySelector('.popup__main-form');
let nameInput = formElement.querySelector('.popup__name');
let jobInput = formElement.querySelector('.popup__function');
let saveButton = document.querySelector('.popup__close-button');

function togglePopup() {
  popup.classList.toggle('popup_opened');
  nameInput.value = defaultName.textContent;
  jobInput.value = defaultJob.textContent;
}

function formSubmitHandler (evt) {
  evt.preventDefault();
  defaultName.textContent = nameInput.value;
  defaultJob.textContent = jobInput.value;
  togglePopup();
}

openPopupButton.addEventListener('click', togglePopup);

closePopupButton.addEventListener('click', togglePopup);

popupOverlay.addEventListener('click', togglePopup);

formElement.addEventListener('submit', formSubmitHandler);