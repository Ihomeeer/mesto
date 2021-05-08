// Основной скрипт, обеспечивающий интерактивность страницы. Его функции:
// 1. Тмпортирует код для классов Card (создание карточки), FormValidator (для валидации), а так же данные для начальных карточек на странице;
// 2. Обеспечивает работу 3х модальных окон - с изменением данных профиля, добавления карточки и ее зума;
// 3. Реализует закрытие модальных окон по клику на необходимую кнопку, оверлей, по нажатию esc;
// 4. Создает 6 "начальных" карточек (данные для них берутся из отдельного файла, куда вынесены для удобства, чтобы не растягивать код);

// символами "===" отделяются друг от друга переменные/функции/обработчики - основные разделы файла
// символами "---" отделяются друг от друга отдельные части разделов, например, различные функции в разделе "функции"
import Card from '../components/Card.js';
import {initialCards} from '../utils/initialCards.js';
import {FormValidator} from '../components/FormValidator.js';
import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js'
import Section from "../components/Section.js";

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

//---------Переменные для валидации---------
export const params = {
  formSelector: '.popup__main-form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error-span_show',
}
const editProfileValidator = new FormValidator(params, profileFormElement);
const addCardValidator = new FormValidator(params, placeForm);


//=========Функции=================================================================================















//---------валидация---------
editProfileValidator.enableValidation();
addCardValidator.enableValidation();





const placePopupHandler = new PopupWithForm(placePopup, submitFormHandlerPlace);
// ---------модальное окно добавления карточек---------
//функция отправки формы
function submitFormHandlerPlace (item) {
  addNewCard(item);
  placePopupHandler.closePopup();
}


const profilePopupHandler = new PopupWithForm(profilePopup, submitFormHandlerProfile);
// ---------профильное модальное окно---------
//первоначальные значения инпутов в профиле
function profileDefaultInfo () {
  nameInput.value = defaultName.textContent;
  jobInput.value = defaultJob.textContent;
}
//функция отправки формы
function submitFormHandlerProfile () {
  defaultName.textContent = nameInput.value;
  defaultJob.textContent = jobInput.value;
  profilePopupHandler.closePopup();
}








//---------создание карточки и добавление ее в разметку---------
// функция создания элемента карточки
const newCard = (item, cardSelector) => {
  const card = new Card(item, cardSelector, handleCardClick);
  const cardElem = card.createCard();

  return cardElem;
};
//функция добавления готовой карточки на страницу
const prependNewCard = (item, container) => {
  container.prepend(newCard(item, '.place-card'));
}
//функция для открытия модалки с увеличеснным изображением
export const handleCardClick = (popupSelector, name, link) => {
  const photoPopupOpened = new PopupWithImage(popupSelector, name, link).openPopup();
}
// ---------функции для создания карточек---------
// ---------первоначальные карточки---------
initialCards.reverse();
const initialCardsList = new Section ({
  item: initialCards,
  renderer: prependNewCard
}, cardGrid);
  initialCardsList.renderItems();

// ---------новая карточка, добавленная через модалку---------
const addNewCard = (item) => {
  const addNewPlaceCard = new Section ({
    item: item,
    renderer: prependNewCard
  }, cardGrid);
  addNewPlaceCard.addItem({name: name.value, link: link.value});
}



//=========Обработчики=================================================================================

// ---------профильное модальное окно---------
//открытие по кнопке и добавление существующей инфо в поля
document.querySelector('.profile__edit-button').addEventListener('click', () => {
  profilePopupHandler.openPopup();
  editProfileValidator.removeErrors();
  profileDefaultInfo();
});
//отправка данных формы
// profileFormElement.addEventListener('submit', submitFormHandlerProfile);

// ---------модальное окно добавления карточек---------
//открытие по кнопке
document.querySelector('.profile__add-button').addEventListener('click', function () {
  addCardValidator.removeErrors();
  addCardValidator.disableSubmitButton();
  placePopupHandler.openPopup();
});



//отправка данных формы
// placePopup.addEventListener('submit', submitFormHandlerPlace);








