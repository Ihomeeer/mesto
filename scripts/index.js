// Основной скрипт, обеспечивающий интерактивность страницы. Его функции:
// 1. Создает карточку по заданным данным (имя и ссылка на картинку) - навешивает обработчики для лайков, удаления и зума изображения;
// 2. Обеспечивает работу 3х модальных окон - с изменением данных профиля, добавления карточки и ее зума;
// 3. Реализует закрытие модальных окон по клику на необходимую кнопку, оверлей, по нажатию esc;
// 4. Создает 6 "начальных" карточек (данные для них берутся из отдельного файла, куда вынесены для удобства, чтобы не растягивать код);

// символами "===" отделяются друг от друга переменные/функции/обработчики
// символами "---" отделяются друг от друга отдельные "модули", например открытие и закрытие модальных окон от непосредственно создания карточки;

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

//=========Классы=========

//---------Создание карточки, добавление обработчиков---------
class Card {
  constructor(name, link, cardSelector) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
  }

  //---------создание карточки---------
  createCard() {
    this.element = this._getTemplate();
    const _newCardName = this.element.querySelector('.elements__name');
    const _newCardPhoto = this.element.querySelector('.elements__photo');
    const _newCardLikeBtn = this.element.querySelector('.elements__like');
    const _newCardDeleteBtn = this.element.querySelector('.elements__delete');
    _newCardName.textContent = this._name;
    _newCardPhoto.src = this._link;
    _newCardPhoto.alt = this._name;
    this._setListeners( _newCardLikeBtn, _newCardDeleteBtn, _newCardPhoto);

    return this.element;
  }

  //---------разметка---------
  _getTemplate() {
    const _cardElement = document.querySelector(this._cardSelector)
      .content
      .querySelector('.elements__card')
      .cloneNode(true);

    return _cardElement;
  }

  //---------лайки---------
  _likeCard (evt) {
    const _targetLikeBtn = evt.target;
    _targetLikeBtn.classList.toggle('elements__like_active');
  }

  //---------удаление---------
  _deleteCard (evt) {
    const _targetDeleteBtn = evt.target;
    _targetDeleteBtn.closest('.elements__card').remove();
  }

  // ---------модальное окно с зумом---------
  // открытие модального окна
  _zoomCard (name, link) {
    const _currentPhoto = photoPopup.querySelector('.popup__photo');
    const _currentName = photoPopup.querySelector('.popup__photo-name');
    this._zoomData (name, link, _currentPhoto, _currentName);
    openPopup(photoPopup);
  }
  // определение переменных и присваивание им значений
  _zoomData (name, link, currentPhoto, currentName) {
    currentPhoto.src = link;
    currentPhoto.alt = name;
    currentName.textContent = name;
  }

  //---------слушатели---------
  _setListeners(likeBtn, deleteBtn, photo) {
    likeBtn.addEventListener('click', (evt) => this._likeCard(evt));
    deleteBtn.addEventListener('click', (evt) => this._deleteCard(evt));
    photo.addEventListener('click', () => this._zoomCard(this._name, this._link));

  }
}

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
function openPopup (elem) {
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
// const removeErrors = (elem) => {
//   const currentInputs = elem.querySelectorAll('.popup__input')
//   currentInputs.forEach((input) => {
//     FormValidator._hideInputError(input, params);
//   });
// }
//функция отключения кнопки отправки
const disableSubmitBtn = (elem) => {                                        //делает кнопку отправки неактивной при повторном открытии модального окна
  const currentButton = elem.querySelector('.popup__save-button');
  const currentInputsList = Array.from(elem.querySelectorAll('.popup__input'));
  // FormValidator._toggleButtonState(currentInputsList, currentButton, params);
}

//=========Обработчики=========

// ---------профильное модальное окно---------
//открытие по кнопке и добавление существующей инфо в поля
document.querySelector('.profile__edit-button').addEventListener('click', function () {
  openPopup(profilePopup);
  // removeErrors(profilePopup);
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
  // removeErrors(placePopup);
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

// ---------модальное окно с зумом---------
photoPopup.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__photo-close-button') ) {
    closePopup(photoPopup);
  }
});



//ПРОВЕРИТЬ ПОЛИМОРФИЗМ
// this - контекст
// в конструктор пихается все, что вызывается один раз, при первом вызове класса.