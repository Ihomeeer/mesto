// Основной скрипт, обеспечивающий интерактивность страницы. Его функции:
// 1. Связывает между собой классы модалок, карточек, данных пользователя, контейнера карточек и Api
// 2. Обеспечивает работу 5х модальных окон - с изменением данных профиля, аватара, добавления карточки, ее удаления и ее зума;
// 3. Реализует закрытие модальных окон по клику на необходимую кнопку, оверлей, по нажатию esc;
// 4. Создает 30 "начальных" карточек, данные которых подгружаются с сервера;

import './index.css';
import {
  profileFormElement,
  nameInput,
  jobInput,
  placeForm,
  photoPopupSelector,
  avatarForm,
  avatar,
  loadingPage,
  params
} from '../scripts/utils/constants.js';
import Card from '../scripts/components/Card.js';
import FormValidator from '../scripts/components/FormValidator.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import PopupWithConfirm from '../scripts/components/PopupWithConfirm.js';
import Section from '../scripts/components/Section.js';
import UserInfo from '../scripts/components/UserInfo.js';
import Api from '../scripts/components/Api.js'


//---------переменная для корректного удаления карточек---------
let cardElement = null;

//---------валидация---------
//включение валидации в форме с профилем (переменная с параметрами и форма)
const editProfileValidator = new FormValidator(params, profileFormElement);
editProfileValidator.enableValidation();
//включение валидации в форме с добавлением карточек (переменная с параметрами и форма)
const addCardValidator = new FormValidator(params, placeForm);
addCardValidator.enableValidation();
//включение валидации в форме с изменением аватара (переменная с параметрами и форма)
const avatarValidator = new FormValidator(params, avatarForm);
avatarValidator.enableValidation();


//---------изменение надписи на кнопке в модалках при загрузке---------
//На вход идут константы, в которые записаны экзеспляры классов(без них функция не вызовется). Сначала проверяется необходимость изменять надпись. Если запрос в данный момент не отправляется - надписи остаются стандартными
//если идет отправка запроса, то надписи на всех модалках меняются на "Сохранение..." с интригующим многоточием...
const toggleButtonCapture = (popupHandler, isTrue) => {
  if (!isTrue)
  {
    popupHandler.changeButtonText('Сохранение...');
  } else {
    if (popupHandler === placePopupHandler)
    {
      popupHandler.changeButtonText('Создать');
    } else {
      popupHandler.changeButtonText('Сохранить');
    }
  }
}


// ---------модальное окно зума карточек---------
//создание нового класса PopupWithImage
const photoPopupHandler = new PopupWithImage(photoPopupSelector);
photoPopupHandler.setEventListeners();
//функция для открытия модалки с увеличеснным изображением
const handleCardClick = (name, link) => {
  photoPopupHandler.openPopup(name, link);
}


// ---------профильное модальное окно---------
//создание класса (селектор попапа, колбэк отпраки формы)
const userInfoHandler = new UserInfo ({nameSelector: '.profile__name', aboutSelector: '.profile__function', avatarSelector: '.profile__avatar'});
//включение передачи информации с формы на страницу (селекторы инпутов)
const profilePopupHandler = new PopupWithForm('#profilePopup', submitFormHandlerProfile);
profilePopupHandler.setEventListeners();
//первоначальные значения инпутов в модалке с профилем
function profileDefaultInfo () {
  const getUserData = userInfoHandler.getUserInfo();
  nameInput.value = getUserData.userName;
  jobInput.value = getUserData.userJob;
}
//функция отправки формы
function submitFormHandlerProfile (newUser) {
  toggleButtonCapture(profilePopupHandler, false);
  apiHandler.sendUserInfo(newUser)
  .then(() => {
    userInfoHandler.setUserInfo(newUser);
    profilePopupHandler.closePopup();
  })
  .catch(error => console.log(error))
  .finally(() => {
    toggleButtonCapture(profilePopupHandler, true);
  });

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
  toggleButtonCapture(placePopupHandler, false);
  apiHandler.sendNewCard(item)
  .then((response) => {
    cardsSection.addItem(response);
    placePopupHandler.closePopup();
  })
  .catch(error => console.log(error))
  .finally(() => {
    toggleButtonCapture(placePopupHandler, true);
  });
}
//слушатели открытия по кнопке
document.querySelector('.profile__add-button').addEventListener('click', function () {
  addCardValidator.removeErrors();
  addCardValidator.disableSubmitButton();
  placePopupHandler.openPopup();
});


// ---------модальное окно для удаления карточек---------
//создание класса (селектор попапа, колбэк отправки формы)
const confirmPopupHandler = new PopupWithConfirm('#confirmPopup', submitFormHandlerConfirm);
confirmPopupHandler.setEventListeners();
//отправка формы
function submitFormHandlerConfirm (id) {
  apiHandler.deleteCard(id)
  .then(() => {
    cardElement.deleteCard();
    confirmPopupHandler.closePopup();
  })
  .catch(error => console.log(error));
}


// ---------модальное окно для смены аватара---------
//создание класса (селектор попапа, колбэк отправки формы)
const avatarPopupHandler = new PopupWithForm('#avatarPopup', submitFormHandlerAvatar);
avatarPopupHandler.setEventListeners();
//отправка формы
function submitFormHandlerAvatar() {
  toggleButtonCapture(avatarPopupHandler, false);
  apiHandler.setAvatar(document.querySelector('.popup__avatar-url').value)
  .then((result => {
    avatar.src = result.avatar;
    avatarPopupHandler.closePopup();
  }))
  .catch(error => console.log(error))
  .finally(() => {
    toggleButtonCapture(avatarPopupHandler, true);
  });
}
//выбор элементов для открытия модалки с аватаром
const avatarPopupElements = (evt) => {
  if (evt.target.classList.contains('profile__avatar-edit-button') || evt.target.classList.contains('profile__avatar-overlay'))
  {
    avatarValidator.removeErrors();
    avatarValidator.disableSubmitButton();
    avatarPopupHandler.openPopup();
  }
}
//слушатели открытия модалки по кнопке
document.querySelector('.profile__avatar-container').addEventListener('mousedown', avatarPopupElements);


//---------создание карточки и добавление ее в разметку---------
//функция создания элемента карточки (создается класс Card, на вход в него подается объект с ссылкой на фото и именем,
//селектор карты, колбэк открытия окна с зумом и колбэк для открытия модалки с удалением
//cardElement = card необходим, чтобы "вытащить" карточку в глобальную область, чтобы можно было запустить
//метод удаления из класса Card
const createNewCard = (item, cardSelector) => {
  const card = new Card(item, cardSelector, handleCardClick,
    () => {
    cardElement = card;
    confirmPopupHandler.openPopup(card.getId());
  },
  () => {
    cardElement = card;
    handleSendLike(item, cardElement);
  },
  () => {
    cardElement = card;
    handleDeleteLike(item, cardElement);
  });

  const cardElem = card.createCard();
  return cardElem;
};
//функция добавления новой карточки в контейнер
const prependNewCard = (item, container) => {
  container.prepend(createNewCard(item, '.place-card'));
}


//---------создание экземпляра класса Section---------
const cardsSection = new Section ({renderer: prependNewCard}, '.elements__grid');


//---------работа с API---------
//создание класса
const apiHandler = new Api({
  baseUrl: 'https://mesto.nomoreparties.co',
  headers: {
    authorization: '5183e2a2-8586-4c29-b979-09c0ece03d78',
    'Content-Type': 'application/json'
  }
});
//Загрузка карточек и данных пользователя в первую очередь, а затем отрисовка страницы
Promise.all([apiHandler.getUserInfo(), apiHandler.getDefaultCards()])
.then(([userInfo, defaultCards]) => {
  getUserData(userInfo);
  const reversedCards = defaultCards.reverse();
  cardsSection.renderItems(reversedCards);
})
.catch(error => console.log(error))
//Функция для получения данных о пользователе с сервера
function getUserData(data) {
  userInfoHandler.setUserInfo(data);
  userInfoHandler.setUserAvatar(data);
}
//колбэк для установки лайка
const handleSendLike = (data, card) => {
  apiHandler.toggleLike('PUT', data._id)
  .then((res) => {card.countLikes(res.likes.length)})
  .catch(error => console.log(error))
}
//колбэк для удаления лайка
const handleDeleteLike = (data, card) => {
  apiHandler.toggleLike('DELETE', data._id)
  .then((res) => {card.countLikes(res.likes.length)})
  .catch(error => console.log(error))
}

//---------слушатель анимации зашрузки---------
avatar.onload = function() {
  loadingPage.classList.add('loading-page_loaded');
}
