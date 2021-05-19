// Основной скрипт, обеспечивающий интерактивность страницы. Его функции:
// 1. Тмпортирует код для классов Card (создание карточки), FormValidator (для валидации), а так же данные для начальных карточек на странице;
// 2. Обеспечивает работу 3х модальных окон - с изменением данных профиля, добавления карточки и ее зума;
// 3. Реализует закрытие модальных окон по клику на необходимую кнопку, оверлей, по нажатию esc;
// 4. Создает 6 "начальных" карточек (данные для них берутся из отдельного файла, куда вынесены для удобства, чтобы не растягивать код);

// символами "===" отделяются друг от друга переменные/функции/обработчики - основные разделы файла
// символами "---" отделяются друг от друга отдельные части разделов, например, различные функции в разделе "функции"
import './index.css';
import {
  profileFormElement,
  nameInput,
  jobInput,
  placeForm,
  photoPopupSelector,
  params
} from '../scripts/utils/constants.js';
import {
  moscow,
  vladivostok,
  rostov,
  ekb,
  sochi,
  peterburg,
  initialCards} from '../scripts/utils/initialCards.js';
import Card from '../scripts/components/Card.js';
import FormValidator from '../scripts/components/FormValidator.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js'
import Section from '../scripts/components/Section.js';
import UserInfo from '../scripts/components/UserInfo.js';

//---------валидация---------
//включение валидации в форме с профилем (переменная с параметрами и форма)
const editProfileValidator = new FormValidator(params, profileFormElement);
editProfileValidator.enableValidation();
//включение валидации в форме с добавлением карточек (переменная с параметрами и форма)
const addCardValidator = new FormValidator(params, placeForm);
addCardValidator.enableValidation();


// ---------модальное окно зума карточек---------
//создание нового класса PopupWithImage
const photoPopupHandler = new PopupWithImage(photoPopupSelector);
photoPopupHandler.setEventListeners();
//функция для открытия модалки с увеличеснным изображением
export const handleCardClick = (name, link) => {
  photoPopupHandler.openPopup(name, link);
}


// ---------профильное модальное окно---------
//включение передачи информации с формы на страницу (селекторы инпутов)
const userInfoHandler = new UserInfo ({nameSelector: '.profile__name', aboutSelector: '.profile__function'});
//создание класса (селектор попапа, колбэк отпраки формы)
const profilePopupHandler = new PopupWithForm('#profilePopup', submitFormHandlerProfile);
profilePopupHandler.setEventListeners();
//первоначальные значения инпутов в профиле
function profileDefaultInfo () {
  const getUserData = userInfoHandler.getUserInfo();
  nameInput.value = getUserData.userName;
  jobInput.value = getUserData.userJob;
}
//функция отправки формы
function submitFormHandlerProfile (newUser) {
  userInfoHandler.setUserInfo(newUser);
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
placePopupHandler.setEventListeners();
//функция отправки формы
function submitFormHandlerPlace (item) {
  cardsSection.addItem(item);
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
const createNewCard = (item, cardSelector) => {
  const card = new Card(item, cardSelector, handleCardClick);
  const cardElem = card.createCard();

  return cardElem;
};
//функция добавления новой карточки в контейнер
const prependNewCard = (item, container) => {
  container.prepend(createNewCard(item, '.place-card'));
}
//создание экземпляра класса Section
initialCards.reverse();
const cardsSection = new Section ({
  item: initialCards,
  renderer: prependNewCard
}, '.elements__grid');
//карточки при старте страницы
  cardsSection.renderItems();


  //Временные скрипты дял верстки модалок и прочего

  
// Вызов попапа удаления на кнопку корзины
  // const confirmPopup = document.querySelector('#confirmPopup');
  // const deleteButton = document.querySelector('.elements__delete');
  // deleteButton.addEventListener('click', () => {
  //   confirmPopup.classList.add('popup_opened')
  // })

