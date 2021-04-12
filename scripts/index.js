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
const cardTemplate = document.querySelector('#placeCard').content;
const cardGrid = document.querySelector('.elements__grid');

//---------Переменные для модального окна с зумом---------
const photoPopup = document.querySelector('#photoPopup');
const currentPhoto = photoPopup.querySelector('.popup__photo');
const currentName = photoPopup.querySelector('.popup__photo-name');

//=========Функции=========

//---------функция создания карточки---------
function createCard (name, link) {
  const newCard = cardTemplate.querySelector('.elements__card').cloneNode(true);
  const item = {
    name: name,
    link: link,
  };
  const newCardName = newCard.querySelector('.elements__name');
  const newCardPhoto = newCard.querySelector('.elements__photo');
  const newCardLikeBtn = newCard.querySelector('.elements__like');
  const newCardDeleteBtn = newCard.querySelector('.elements__delete');
  newCardName.textContent = item.name;
  newCardPhoto.src = item.link;
  newCardPhoto.alt = item.name;
  newCardPhoto.addEventListener('click', () => zoomCard(item));
  newCardLikeBtn.addEventListener('click', (evt) => likeCard(evt));
  newCardDeleteBtn.addEventListener('click', (evt) => deleteCard(evt));
  return newCard;
}

//---------добавление карточки в контейнер---------
function prependNewCard (container, cardElem) {
  container.prepend(cardElem);
}

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
  const card = createCard(name, link);
  prependNewCard(cardGrid, card);
  closePopup(placePopup);
  placeForm.reset();
  setEventListeners(placeForm, params);   //делает кнопку отправки неактивной при повторном открытии модального окна
}

// ---------модальное окно с зумом---------
// открытие модального окна
function zoomCard (item) {
  zoomData (item);
  openPopup(photoPopup);
}
// определение переменных и присваивание им значений
function zoomData (item) {
  currentPhoto.src = item.link;
  currentPhoto.alt = item.name;
  currentName.textContent = item.name;
}

//---------функция лайка---------
function likeCard (evt) {
  const targetLikeBtn = evt.target;
  targetLikeBtn.classList.toggle('elements__like_active');
}

//---------функция удаления---------
function deleteCard (evt) {
  const targetDeleteBtn = evt.target;
  targetDeleteBtn.closest('.elements__card').remove();
}

//---------функция скрытия ошибок при повторном открытии форм с пустыми полями---------
const removeErrors = (elem) => {
  const currentInputs = elem.querySelectorAll('.popup__input')
  currentInputs.forEach((input) => {
    hideInputError(input, params)
  });
}

// ---------первоначальные карточки---------
initialCards.reverse();
initialCards.forEach(function (initialCards) {
  prependNewCard(cardGrid, createCard(initialCards.name, initialCards.link));
});

//=========Обработчики=========

// ---------профильное модальное окно---------
//открытие по кнопке и добавление существующей инфо в поля
document.querySelector('.profile__edit-button').addEventListener('click', function () {
  openPopup(profilePopup);
  removeErrors(profilePopup);
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
  openPopup(placePopup);
  removeErrors(placePopup);
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
//закрытие модального окна по клику на кнопку и на оверлей
photoPopup.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__photo-close-button') ) {
    closePopup(photoPopup);
  }
});