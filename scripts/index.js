// ---------Попап добавления карточки и само добавление---------
const placePopup = document.querySelector('#placePopup');
const placeOpenPopupBtn = document.querySelector('.profile__add-button');
const placePopupCloseBtn = placePopup.querySelector('#placePopupCloseBtn');
const placePopupOverlay = placePopup.querySelector('.popup__overlay');
const placeFormElement = document.querySelector('#placeForm');
const placeCard = document.querySelector('#placeCard').content;
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
  cardGrid.prepend(card);
  placeNameInput.value = '';
  placeLinkInput.value = '';
  card.querySelector('.elements__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('elements__like_active');
  });
  cardDelete();
  zoomImage();
  togglePlacePopup();
}

placeOpenPopupBtn.addEventListener('click', togglePlacePopup);
placePopupCloseBtn.addEventListener('click', togglePlacePopup);
placePopupOverlay.addEventListener('click', togglePlacePopup);
placeFormElement.addEventListener('submit', formSubmitHandlerPlace);

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

// ---------Лайки---------
function likes () {
  const likeBtns = document.querySelectorAll('.elements__like');
  likeBtns.forEach(function (likeBtns) {
  likeBtns.addEventListener('click', function (evt) {
    const targetLikeBtn = evt.target;
    targetLikeBtn.classList.toggle('elements__like_active');
    });
  });
}

likes();

// ---------Удаление карточек---------
function cardDelete () {
  const deleteBtns = document.querySelectorAll('.elements__delete');
  deleteBtns.forEach(function (deleteBtns) {
    deleteBtns.addEventListener('click', function (evt) {
      const targetDeleteBtn = evt.target;
      targetDeleteBtn.closest('.elements__card').remove();
    });
  });
}

cardDelete();

// ---------Попап (который вроде как модальное окно на самом деле?) с картинками---------
const photoPopup = document.querySelector('.photo-popup');
const photoPopupCloseBtn = photoPopup.querySelector('#photoPopupCloseBtn');
const photoPopupOverlay = photoPopup.querySelector('.popup__overlay');

function togglePhotoPopup(evt) {
  evt.preventDefault();
  photoPopup.classList.toggle('photo-popup_opened');
}

function photoBtnsDet () {
  const photoBtns = document.querySelectorAll('.elements__photo');
  photoBtns.forEach(function (evt) {
  evt.addEventListener('click', togglePhotoPopup);
  });
}

function zoomImage () {
  const photoBtns = document.querySelectorAll('.elements__photo');
  const currentPhoto = photoPopup.querySelector('.photo-popup__photo');
  const currentName = photoPopup.querySelector('.photo-popup__name');

  photoBtns.forEach(function (evt) {
    evt.addEventListener('click', function(evt) {
      evt.preventDefault(evt);
      currentPhoto.src = evt.target.src;
      currentName.textContent = `${evt.target.parentElement.textContent}`;
      console.log(evt.target.parentElement.value);
      console.log(currentName)
    });
  });
  photoBtnsDet();
}

zoomImage ()

photoPopupCloseBtn.addEventListener('click', togglePhotoPopup);
photoPopupOverlay.addEventListener('click', togglePhotoPopup);


