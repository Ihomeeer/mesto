// Основной скрипт, обеспечивающий интерактивность страницы. Его функции:
// 1. Тмпортирует код для классов Card (создание карточки), FormValidator (для валидации), а так же данные для начальных карточек на странице;
// 2. Обеспечивает работу 3х модальных окон - с изменением данных профиля, добавления карточки и ее зума;
// 3. Реализует закрытие модальных окон по клику на необходимую кнопку, оверлей, по нажатию esc;
// 4. Создает 6 "начальных" карточек (данные для них берутся из отдельного файла, куда вынесены для удобства, чтобы не растягивать код);

// символами "===" отделяются друг от друга переменные/функции/обработчики - основные разделы файла
// символами "---" отделяются друг от друга отдельные части разделов, например, различные функции в разделе "функции"
import {Card} from './Card.js';
import {initialCards} from './InitialCards.js';
import {FormValidator} from './FormValidator.js';
import {openPopup, closePopup, closePopupEscButton} from './utilityFuncs.js'

//=========Переменные=================================================================================

//---------Переменные для профильного модального окна---------
const profilePopup = document.querySelector('#profilePopup');
const defaultName = document.querySelector('.profile__name');
const defaultJob = document.querySelector('.profile__function');
const profileFormElement = document.querySelector('#profileForm');
const nameInput = profileFormElement.querySelector('#profilePopupName');
const jobInput = profileFormElement.querySelector('#profilePopupJob');

//---------Переменные для модального окна добавления карточек---------
const placePopup = document.querySelector('#placePopup');
const placeForm = document.querySelector('#placeForm');
const cardGrid = document.querySelector('.elements__grid');
const name = placePopup.querySelector('#placePopupName');
const link = placePopup.querySelector('#placePopupLink');

//---------Переменные для модального окна с зумом---------
export const photoPopup = document.querySelector('#photoPopup');

//---------Переменная для записи параметров валидации---------
export const params = {
  formSelector: '.popup__main-form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error-span_show',
}

//---------Переменные для валидации---------
const formList = document.querySelectorAll('.popup__main-form');
export const currentPhoto = photoPopup.querySelector('.popup__photo');
export const currentName = photoPopup.querySelector('.popup__photo-name');
const editProfileValidator = new FormValidator(params, profileFormElement);
const addCardValidator = new FormValidator(params, placeForm);

//=========Функции=================================================================================

//---------валидация---------
editProfileValidator.enableValidation();
addCardValidator.enableValidation();

//---------создание и добавление карточки в контейнер---------
//функция создания элемента карточки
const newCard = (name, link, cardSelector) => {
  const card = new Card(name, link, cardSelector);
  const cardElem = card.createCard();

  return cardElem;
};
//функция добавления готовой карточки на страницу
const prependNewCard = (name, link, container, cardSelector) => {
  container.prepend(newCard(name, link, cardSelector));
}

// ---------первоначальные карточки---------
initialCards.reverse();
initialCards.forEach((initialCards) => {
  prependNewCard(initialCards.name, initialCards.link, cardGrid, '.place-card');
});

//---------открытие и закрытие модальных окон---------
//функция закрытия модальных окон по нажатию на кнопку закрытия или оверлей
const closePopupHandler = (evt) => {
  if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-button') || evt.target.classList.contains('popup__photo-close-button')) {
    closePopup(evt.target.closest('.popup'));
  }
}

// ---------профильное модальное окно---------
//первоначальные значения инпутов в профиле
function profileDefaultInfo () {
  nameInput.value = defaultName.textContent;
  jobInput.value = defaultJob.textContent;
}
//функция отправки формы
function submitFormHandlerProfile (evt) {
  evt.preventDefault();
  defaultName.textContent = nameInput.value;
  defaultJob.textContent = jobInput.value;
  closePopup(profilePopup);
}

// ---------модальное окно добавления карточек---------
//функция отправки формы
function submitFormHandlerPlace (evt) {
  evt.preventDefault();
  prependNewCard(name.value, link.value, cardGrid, '.place-card');
  closePopup(placePopup);
}

//=========Обработчики=================================================================================

// ---------профильное модальное окно---------
//открытие по кнопке и добавление существующей инфо в поля
document.querySelector('.profile__edit-button').addEventListener('click', function () {
  openPopup(profilePopup);
  editProfileValidator.removeErrors();
  profileDefaultInfo();
});
//закрытие модального окна по клику на кнопку и на оверлей
profilePopup.addEventListener('mousedown', (evt) => {
  closePopupHandler(evt);
});
//отправка данных формы
profileFormElement.addEventListener('submit', submitFormHandlerProfile);

// ---------модальное окно добавления карточек---------
//открытие по кнопке
document.querySelector('.profile__add-button').addEventListener('click', function () {
  placeForm.reset();
  addCardValidator.removeErrors();
  addCardValidator.disableSubmitButton();
  openPopup(placePopup);
});
//закрытие модального окна по клику на кнопку и на оверлей
placePopup.addEventListener('mousedown', (evt) => {
  closePopupHandler(evt);
});
//отправка данных формы
placePopup.addEventListener('submit', submitFormHandlerPlace);

// ---------модальное окно с зумом фото---------
photoPopup.addEventListener('click', (evt) => {
  closePopupHandler(evt);
});
