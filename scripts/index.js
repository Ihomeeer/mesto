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
const placePopupSaveButton = placePopup.querySelector('#placePopupSaveBtn');

//---------Переменные для модального окна с зумом---------
export const photoPopup = document.querySelector('#photoPopup');

//---------Переменные для валидации---------
const formList = document.querySelectorAll('.popup__main-form');
export const currentPhoto = photoPopup.querySelector('.popup__photo');
export const currentName = photoPopup.querySelector('.popup__photo-name');

//---------Переменная для записи параметров валидации---------
export const params = {
  formSelector: '.popup__main-form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error-span_show',
}

//=========Функции=================================================================================

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
//функция открытия модальных окон
export function openPopup (elem) {
  elem.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEscButton);
}
//функция закрытия модальных окон
function closePopup (elem) {
  elem.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEscButton);
}
//функция закрытия модальных окон по нажатию на кнопку закрытия или оверлей + сброс введеных данных в инпутах модалки добавления карточек
const closePopuphandler = (evt) => {
  if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-button')) {
    closePopup(evt.target.closest('.popup'));
    if (evt.target.id === 'placePopup' || evt.target.id === 'placePopupCloseBtn') {
      placeForm.reset();
    }
  }
}
//функция закрытия модальных окон по нажатию esc
function closePopupEscButton (evt) {
  if (evt.key === 'Escape') {
    const currentPopup = document.querySelector('.popup_opened');
    closePopup(currentPopup);
  };
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
  placeForm.reset();
}

//---------манипуляции при повторном открытии форм с пустыми полями---------
//функция скрытия ошибок
const removeErrors = ((params, form) => {
const removeCurrentErrors = new FormValidator(params, form).removeErrors(params, form);
});
//функция отключения кнопки отправки - делает кнопку отправки неактивной при повторном открытии модального окна
const disableSubmitBtn = (params, form, button) => {
  const disableSubmitButton = new FormValidator(params, form).disableSubmitButton(button);
}

// ---------запуск валидации---------
function launchValidation (params, form) {
  const validation = new FormValidator(params, form).enableValidation();
}

//=========Обработчики=================================================================================

// ---------профильное модальное окно---------
//открытие по кнопке и добавление существующей инфо в поля
document.querySelector('.profile__edit-button').addEventListener('click', function () {
  openPopup(profilePopup);
  removeErrors(params, profilePopup);
  profileDefaultInfo();
});
//закрытие модального окна по клику на кнопку и на оверлей
profilePopup.addEventListener('mousedown', (evt) => {
  closePopuphandler(evt);
});
//отправка данных формы
profileFormElement.addEventListener('submit', submitFormHandlerProfile);

// ---------модальное окно добавления карточек---------
//открытие по кнопке
document.querySelector('.profile__add-button').addEventListener('click', function () {
  removeErrors(params, placePopup);
  disableSubmitBtn(params, placeForm, placePopupSaveButton);
  openPopup(placePopup);
});
//закрытие модального окна по клику на кнопку и на оверлей и сброс данных в инпутах
placePopup.addEventListener('mousedown', (evt) => {
  closePopuphandler(evt);
  });
//отправка данных формы
placePopup.addEventListener('submit', submitFormHandlerPlace);

// ---------модальное окно с зумом фото---------
photoPopup.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__photo-close-button') ) {
    closePopup(photoPopup);
  }
});

// ---------валидация---------
document.addEventListener('DOMContentLoaded', () => {
  formList.forEach((form) => {
    launchValidation(params, form);
  })
});

