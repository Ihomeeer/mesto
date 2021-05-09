// Основной скрипт, обеспечивающий интерактивность страницы. Его функции:
// 1. Тмпортирует код для классов Card (создание карточки), FormValidator (для валидации), а так же данные для начальных карточек на странице;
// 2. Обеспечивает работу 3х модальных окон - с изменением данных профиля, добавления карточки и ее зума;
// 3. Реализует закрытие модальных окон по клику на необходимую кнопку, оверлей, по нажатию esc;
// 4. Создает 6 "начальных" карточек (данные для них берутся из отдельного файла, куда вынесены для удобства, чтобы не растягивать код);

// символами "===" отделяются друг от друга переменные/функции/обработчики - основные разделы файла
// символами "---" отделяются друг от друга отдельные части разделов, например, различные функции в разделе "функции"
import Card from '../components/Card.js';
import {initialCards} from '../utils/initialCards.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js'
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js'

//=========Переменные=================================================================================

//---------Переменные для профильного модального окна---------
const profilePopup = document.querySelector('#profilePopup');
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

//---------Переменные для валидации---------
export const params = {
  formSelector: '.popup__main-form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error-span_show',
}


//---------валидация---------
//включение валидации в форме с профилем (переменная с параметрами и форма)
const editProfileValidator = new FormValidator(params, profileFormElement);
editProfileValidator.enableValidation();
//включение валидации в форме с добавлением карточек (переменная с параметрами и форма)
const addCardValidator = new FormValidator(params, placeForm);
addCardValidator.enableValidation();


// ---------модальное окно зума карточек---------
//функция для открытия модалки с увеличеснным изображением
export const handleCardClick = (popupSelector, name, link) => {
  const photoPopupOpened = new PopupWithImage('#photoPopup', name, link).openPopup();
}


// ---------профильное модальное окно---------
//включение передачи информации с формы на страницу (селекторы инпутов)
const userInfoHandler = new UserInfo ({nameSelector: '.profile__name', aboutSelector: '.profile__function'});
//создание класса (селектор попапа, колбэк отпраки формы)
const profilePopupHandler = new PopupWithForm('#profilePopup', submitFormHandlerProfile);
//первоначальные значения инпутов в профиле
function profileDefaultInfo () {
  const getUserData = userInfoHandler.getUserInfo();
  nameInput.value = getUserData.UserName;
  jobInput.value = getUserData.UserJob;
}
//функция отправки формы
function submitFormHandlerProfile () {
  const newProfileInfo = userInfoHandler.setUserInfo(nameInput.value, jobInput.value);
  profilePopupHandler.closePopup();
}
//слушатель открытия по кнопке и добавления существующей инфо в поля
document.querySelector('.profile__edit-button').addEventListener('click', () => {
  profilePopupHandler.openPopup();
  editProfileValidator.removeErrors();
  profileDefaultInfo();
});


// ---------модальное окно для добавления карточек---------
//создание классса (селектор попапа, колбэк отправки формы)
const placePopupHandler = new PopupWithForm('#placePopup', submitFormHandlerPlace);
//функция отправки формы
function submitFormHandlerPlace (item) {
  addNewCard(item);
  placePopupHandler.closePopup();
}
//слушатели открытия по кнопке
document.querySelector('.profile__add-button').addEventListener('click', function () {
  addCardValidator.removeErrors();
  addCardValidator.disableSubmitButton();
  placePopupHandler.openPopup();
});


//---------создание карточки и добавление ее в разметку---------
//функция создания элемента карточки (создается класс Card, на вход в него подается объект с ссылкой на фото и именем, селектор карты и колбэк открытия окна с зумом)
const newCard = (item, cardSelector) => {
  const card = new Card(item, cardSelector, handleCardClick);
  const cardElem = card.createCard();

  return cardElem;
};
//функция добавления новой карточки в контейнер
const prependNewCard = (item, container) => {
  container.prepend(newCard(item, '.place-card'));
}
//новая карточка, добавленная через модалку
const addNewCard = (item) => {
  const addNewPlaceCard = new Section ({
    item: item,
    renderer: prependNewCard
  }, cardGrid);
  addNewPlaceCard.addItem({name: name.value, link: link.value});
}
//карточки при старте страницы
initialCards.reverse();
const initialCardsList = new Section ({
  item: initialCards,
  renderer: prependNewCard
}, cardGrid);
  initialCardsList.renderItems();