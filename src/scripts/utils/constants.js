//Все глобальные переменные для проекта
//---------Переменные для профильного модального окна---------
const profileFormElement = document.querySelector('#profileForm');
const nameInput = profileFormElement.querySelector('#profilePopupName');
const jobInput = profileFormElement.querySelector('#profilePopupJob');

//---------Переменные для модального окна добавления карточек---------
const placeForm = document.querySelector('#placeForm');

//---------Переменные для модального окна с зумом---------
const photoPopupSelector = '#photoPopup';

//---------Переменные для модального окна с изменением аватара---------
const avatarForm = document.querySelector('#avatarForm');
const avatar = document.querySelector('.profile__avatar');

//---------Переменная для загрузочой анимации---------
const loadingPage = document.querySelector('.loading-page');

//---------Переменные для валидации---------
const params = {
  formSelector: '.popup__main-form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error-span_show',
}

export {
  profileFormElement,
  nameInput,
  jobInput,
  placeForm,
  photoPopupSelector,
  avatarForm,
  avatar,
  loadingPage,
  params
}
