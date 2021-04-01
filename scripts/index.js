//=========Переменные=========

//---------Переменные для профильного модального окна---------
const profilePopup = document.querySelector('#profilePopup');
const defaultName = document.querySelector('.profile__name');
const defaultJob = document.querySelector('.profile__function');
const profileFormElement = document.querySelector('#profileForm');
const nameInput = profileFormElement.querySelector('#profilePopupName');
const jobInput = profileFormElement.querySelector('#profilePopupJob');

//---------Переменные для модального окна создания карточек---------
const placePopup = document.querySelector('#placePopup');
const placeForm = document.querySelector('#placeForm');
const cardTemplate = document.querySelector('#placeCard').content;
const cardGrid = document.querySelector('.elements__grid');

//---------Переменные для модального окна с зумом---------
const photoPopup = document.querySelector('#photoPopup');
const currentPhoto = photoPopup.querySelector('.popup__photo');
const currentName = photoPopup.querySelector('.popup__photo-name');

//---------Переменные для первоначальных карточек---------
const initialCards = [
  {
    name: 'Москва',
    link: './images/1-Moscow-min.jpg'
  },
  {
    name: 'Владивосток',
    link: './images/2-Vladivostok-min.jpg'
  },
  {
    name: 'Ростов-на-Дону',
    link: './images/3-Rostov-min.jpg'
  },
  {
    name: 'Екатеринбург',
    link: './images/4-EKB-min.jpg'
  },
  {
    name: 'Сочи',
    link: './images/5-Sochi-min.jpg'
  },
  {
    name: 'Санкт-Петербург',
    link: './images/6-Peterburg-min.jpg'
  }
];

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
  cardZoom(newCardPhoto, item);
  cardLike(newCardLikeBtn);
  cardDelete(newCardDeleteBtn);
  newCardPrepend (newCard);
  return newCard;
}
//добавление карточки в контейнер
function newCardPrepend (elem) {
  cardGrid.prepend(elem);
}

// ---------открытие и закрытие модальных окон---------
function openPopup (elem) {
  elem.classList.add('popup_opened');
}

function closePopup (elem) {
  elem.classList.remove('popup_opened');
}

// ---------профильное модальное окно---------
//первоначальные значения инпутов в профиле
function profileDefaultInfo () {
  nameInput.value = defaultName.textContent;
  jobInput.value = defaultJob.textContent;
}
//функция отправки формы
function formSubmitHandlerProfile (evt) {
  evt.preventDefault();
  defaultName.textContent = nameInput.value;
  defaultJob.textContent = jobInput.value;
  closePopup(profilePopup);
}

// ---------модальное окно добавления карточек---------
//сбрасывание значений инпутов после отправки
function resetValues () {
  placePopup.querySelector('#placeForm').reset();
}
//функция отправки формы
function formSubmitHandlerPlace (evt) {
  evt.preventDefault();
  const name = placePopup.querySelector('#placePopupName').value;
  const link = placePopup.querySelector('#placePopupLink').value;
  createCard(name, link);
  closePopup(placePopup);
  resetValues();
}

// ---------модальное окно с зумом---------
// открытие модального окна
function cardZoom (elem, item) {
  elem.addEventListener('click', function () {
    openPopup(photoPopup);
    zoomData (item);
  });
}
// определение переменных и присваивание им значений
  function zoomData (item) {
    currentPhoto.src = item.link;
    currentPhoto.alt = item.name;
    currentName.textContent = item.name;
  }

//---------функция лайка---------
function cardLike (elem) {
  elem.addEventListener('click', function (evt) {
    const targetLikeBtn = evt.target;
    targetLikeBtn.classList.toggle('elements__like_active');
  });
}

//---------функция удаления---------
function cardDelete (elem) {
  elem.addEventListener('click', function (evt) {
  const targetDeleteBtn = evt.target;
  targetDeleteBtn.closest('.elements__card').remove();
  });
}

// ---------первоначальные карточки---------
initialCards.reverse();
initialCards.forEach(function (initialCards) {
  createCard(initialCards.name, initialCards.link)
});

//=========Обработчики=========

// ---------профильное модальное окно---------
document.querySelector('.profile__edit-button').addEventListener('click', function () {
  openPopup(profilePopup);
  profileDefaultInfo ();
});
profilePopup.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-button')) {
    closePopup(profilePopup);
  }
});
profileFormElement.addEventListener('submit', formSubmitHandlerProfile);

// ---------модальное окно для нового места---------
document.querySelector('.profile__add-button').addEventListener('click', function () {
  openPopup(placePopup);
});
placePopup.addEventListener('submit', formSubmitHandlerPlace);
placePopup.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-button') ) {
    closePopup(placePopup);
  }
});

// ---------модальное окно с зумом---------
photoPopup.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__photo-close-button') ) {
    closePopup(photoPopup);
  }
});