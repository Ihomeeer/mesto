// Основной скрипт, обеспечивающий интерактивность страницы. Его функции:
// 1. Тмпортирует код для классов Card (создание карточки), FormValidator (для валидации), а так же данные для начальных карточек на странице;
// 2. Обеспечивает работу 3х модальных окон - с изменением данных профиля, добавления карточки и ее зума;
// 3. Реализует закрытие модальных окон по клику на необходимую кнопку, оверлей, по нажатию esc;
// 4. Создает 6 "начальных" карточек (данные для них берутся из отдельного файла, куда вынесены для удобства, чтобы не растягивать код);

// символами "===" отделяются друг от друга переменные/функции/обработчики - основные разделы файла
// символами "---" отделяются друг от друга отдельные части разделов, например, различные функции в разделе "функции"
import {Card} from './Card.js';
import {initialCards} from './InitialCards.js';
import {params, FormValidator} from './FormValidator.js';


//=========Переменные=========


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

//---------Переменные для модального окна с зумом---------
const photoPopup = document.querySelector('#photoPopup');

//---------Переменные для валидации---------
const formList = document.querySelectorAll('.popup__main-form');


//=========Функции=========


//---------добавление карточки в контейнер---------
function prependNewCard (name, link, container, cardSelector) {
  const card = new Card(name, link, cardSelector);
  const cardElem = card.createCard();
  container.prepend(cardElem);
}

// ---------первоначальные карточки---------
initialCards.reverse();
initialCards.forEach(function (initialCards) {
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
//функция закрытия модальных окон по нажатию esc
function closePopupEscButton (evt) {
  const currentPopup = document.querySelector('.popup_opened');
  if (evt.key === 'Escape') {
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
  const name = placePopup.querySelector('#placePopupName').value;
  const link = placePopup.querySelector('#placePopupLink').value;
  prependNewCard(name, link, cardGrid, '.place-card');
  closePopup(placePopup);
  placeForm.reset();
}

//---------манипуляции при повторном открытии форм с пустыми полями---------
//функция скрытия ошибок
const removeErrors = ((params, elem) => {
  const currentErrors = elem.querySelectorAll('.popup__error-span');
  const currentInputs = elem.querySelectorAll('.popup__input');
  currentErrors.forEach((error) => {
    error.classList.remove(params.errorClass);
  });
  currentInputs.forEach((input) => {
    input.classList.remove(params.inputErrorClass);
  });
});
//функция отключения кнопки отправки
const disableSubmitBtn = (elem) => {                                        //делает кнопку отправки неактивной при повторном открытии модального окна
  const currentButton = elem.querySelector('.popup__save-button');
  currentButton.disabled = true;
  currentButton.classList.add(params.inactiveButtonClass);
}

// ---------запуск валидации---------
function launchValidation (params, form) {
  const validation = new FormValidator(params, form).enableValidation();
}


//=========Обработчики=========


// ---------профильное модальное окно---------
//открытие по кнопке и добавление существующей инфо в поля
document.querySelector('.profile__edit-button').addEventListener('click', function () {
  openPopup(profilePopup);
  removeErrors(params, profilePopup);
  profileDefaultInfo();
});
//закрытие модального окна по клику на кнопку и на оверлей
profilePopup.addEventListener('mousedown', (evt) => {
  if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-button')) {
    closePopup(profilePopup);
  }
});
//отправка данных формы
profileFormElement.addEventListener('submit', submitFormHandlerProfile);

// ---------модальное окно добавления карточек---------
//открытие по кнопке
document.querySelector('.profile__add-button').addEventListener('click', function () {
  removeErrors(params, placePopup);
  disableSubmitBtn(placePopup);
  openPopup(placePopup);
});
//закрытие модального окна по клику на кнопку и на оверлей и сброс формы
placePopup.addEventListener('mousedown', (evt) => {
  if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-button') ) {
    closePopup(placePopup);
    placeForm.reset();
  }
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

