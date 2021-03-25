// ---------Попап редактирования профиля---------
const profilePopup = document.querySelector('#profilePopup');
const profileOpenPopupBtn = document.querySelector('.profile__edit-button');
const profilePopupCloseBtn = profilePopup.querySelector('#profilePopupCloseBtn');
const profilePopupOverlay = profilePopup.querySelector('.popup__overlay');
let defaultName = document.querySelector('.profile__name');
let defaultJob = document.querySelector('.profile__function');
const profileFormElement = document.querySelector('#profileForm');
let nameInput = profileFormElement.querySelector('#profilePopupName');
let jobInput = profileFormElement.querySelector('#profilePopupJob');
// let profilePopupSaveBtn = document.querySelector('#profilePopupSaveBtn');

function toggleProfilePopup() {
  profilePopup.classList.toggle('popup_opened');
  nameInput.value = defaultName.textContent;
  jobInput.value = defaultJob.textContent;
}

function formSubmitHandlerProfile (evt) {
  evt.preventDefault();
  defaultName.textContent = nameInput.value;
  defaultJob.textContent = jobInput.value;
  toggleProfilePopup();
}

profileOpenPopupBtn.addEventListener('click', toggleProfilePopup);
profilePopupCloseBtn.addEventListener('click', toggleProfilePopup);
profilePopupOverlay.addEventListener('click', toggleProfilePopup);
profileFormElement.addEventListener('submit', formSubmitHandlerProfile);

// ---------Попап добавления карточки---------
const placePopup = document.querySelector('#placePopup');
const placeOpenPopupBtn = document.querySelector('.profile__add-button');
const placePopupCloseBtn = placePopup.querySelector('#placePopupCloseBtn');
const placePopupOverlay = placePopup.querySelector('.popup__overlay');
const placeFormElement = document.querySelector('#placeForm');
let placeNameInput = placeFormElement.querySelector('#placePopupName');
let placeLinkInput = placeFormElement.querySelector('#placePopupLink');

function togglePlacePopup() {
  placePopup.classList.toggle('popup_opened');
}

function formSubmitHandlerPlace (evt) {
  evt.preventDefault();
  const card = placeCard.querySelector('.elements__card').cloneNode(true);
  card.querySelector('.elements__photo').src = placeLinkInput.value;
  card.querySelector('.elements__photo').alt = placeNameInput.value;
  card.querySelector('.elements__name').textContent = placeNameInput.value;
  cardGrid.append(card);
  togglePlacePopup();
}

placeOpenPopupBtn.addEventListener('click', togglePlacePopup);
placePopupCloseBtn.addEventListener('click', togglePlacePopup);
placePopupOverlay.addEventListener('click', togglePlacePopup);
placeFormElement.addEventListener('submit', formSubmitHandlerPlace);

// ---------Темплейт карточки---------
const placeCard = document.querySelector('#placeCard').content;

// ---------6 начальных карточек---------
const cardGrid = document.querySelector('.elements__grid');
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

for (let i=0; i < initialCards.length; i++) {
  const card = placeCard.querySelector('.elements__card').cloneNode(true);
  card.querySelector('.elements__photo').src = initialCards[i].link;
  card.querySelector('.elements__photo').alt = initialCards[i].name;
  card.querySelector('.elements__name').textContent = initialCards[i].name;
  cardGrid.append(card);
}

// ---------Добавление карточек---------
// const card = placeCard.querySelector('.elements__card').cloneNode(true);
// card.querySelector('.elements__photo').src = placeLinkInput.value;
// card.querySelector('.elements__photo').alt = placeNameInput.value;
// card.querySelector('.elements__name').textContent = placeNameInput.value;
// cardGrid.append(card);

// ---------Лайки---------
const likeBtn = document.querySelectorAll('.elements__like');

likeBtn.forEach(function (likeBtn) {
  likeBtn.addEventListener('click', function (evt) {
    const targetLikeBtn = evt.target;
    targetLikeBtn.classList.toggle('elements__like_active');
  });
});
