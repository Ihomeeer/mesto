//---------Переменные для профильного модального окна---------
const profilePopup = document.querySelector('#profilePopup');
const defaultName = document.querySelector('.profile__name');
const defaultJob = document.querySelector('.profile__function');
const profileFormElement = document.querySelector('#profileForm');
const nameInput = profileFormElement.querySelector('#profilePopupName');
const jobInput = profileFormElement.querySelector('#profilePopupJob');
//---------Переменные для модального окна создания карточек---------









// ---------открытие и закрытие модальных окон---------
function openPopup (elem) {
  elem.classList.add('popup_opened');
}

function closePopup (elem) {
  elem.classList.remove('popup_opened');
}
// ---------профильное модальное окно---------
function profileDefaultInfo () {
  nameInput.value = defaultName.textContent;
  jobInput.value = defaultJob.textContent;
}

function formSubmitHandlerProfile (evt) {
  evt.preventDefault();

  defaultName.textContent = nameInput.value;
  defaultJob.textContent = jobInput.value;
  closePopup(profilePopup);
}
// ---------модальное окно создания карточек---------
const placePopup = document.querySelector('#placePopup');
const placeForm = document.querySelector('#placeForm');
const placeCard = document.querySelector('#placeCard').content;
const cardGrid = document.querySelector('.elements__grid');
const name = placePopup.querySelector('#placePopupName');
const link = placePopup.querySelector('#placePopupLink');
let item = {

}

function createCard (name, link) {
  const card = placeCard.querySelector('.elements__card').cloneNode(true);
}





// function togglePlacePopup() {
//   placePopup.classList.toggle('popup_opened');
// }

// function newCardPrepend (elem) {
//   cardGrid.prepend(elem);
// }

// function addNewCard () {
//   let placeNameInput = placeFormElement.querySelector('#placePopupName');
//   let placeLinkInput = placeFormElement.querySelector('#placePopupLink');
//   const card = placeCard.querySelector('.elements__card').cloneNode(true);
//   const cardPhoto = card.querySelector('.elements__photo');
//   cardPhoto.src = placeLinkInput.value;
//   const cardName = card.querySelector('.elements__name');
//   cardName.textContent = placeNameInput.value;
//   placeNameInput.value = '';
//   placeLinkInput.value = '';
//   newCardPrepend(card);
//   newCardLike(card);
// }

// function formSubmitHandlerPlace (evt) {
//   evt.preventDefault();
//   addNewCard();
//   deleteCard();
//   zoomImage();
//   togglePlacePopup();
// }

// document.querySelector('.profile__add-button').addEventListener('click', togglePlacePopup);
// placePopup.querySelector('#placePopupCloseBtn').addEventListener('click', togglePlacePopup);
// placePopup.querySelector('.popup__overlay').addEventListener('click', togglePlacePopup);
// placeFormElement.addEventListener('submit', formSubmitHandlerPlace);










// ---------профильное модальное окно---------
document.querySelector('.profile__edit-button').addEventListener('click', function () {
  openPopup(profilePopup);
  profileDefaultInfo ();
});
profilePopup.querySelector('#profilePopupCloseBtn').addEventListener('click', function () {
  closePopup(profilePopup);
});
profilePopup.querySelector('.popup__overlay').addEventListener('click', function () {
  closePopup(profilePopup);
});
profileFormElement.addEventListener('submit', formSubmitHandlerProfile);
// ---------









































// ---------Модалка добавления карточки и само добавление---------




// const photoPopup = document.querySelector('.photo-popup');

// // ---------

// // ---------6 начальных карточек---------
// const initialCards = [
//   {
//     name: 'Москва',
//     link: './images/1-Moscow-min.jpg'
//   },
//   {
//     name: 'Владивосток',
//     link: './images/2-Vladivostok-min.jpg'
//   },
//   {
//     name: 'Ростов-на-Дону',
//     link: './images/3-Rostov-min.jpg'
//   },
//   {
//     name: 'Екатеринбург',
//     link: './images/4-EKB-min.jpg'
//   },
//   {
//     name: 'Сочи',
//     link: './images/5-Sochi-min.jpg'
//   },
//   {
//     name: 'Санкт-Петербург',
//     link: './images/6-Peterburg-min.jpg'
//   }
// ];

// function cardsAppend (elem) {
//   cardGrid.append(elem);
// }

// for (let i=0; i < initialCards.length; i++) {
//   const card = placeCard.querySelector('.elements__card').cloneNode(true);
//   card.querySelector('.elements__photo').src = initialCards[i].link;
//   card.querySelector('.elements__photo').alt = initialCards[i].name;
//   card.querySelector('.elements__name').textContent = initialCards[i].name;
//   cardsAppend(card);
// }
// // ---------

// // ---------Лайки---------
// function cardLikes () {
//   const likeBtns = document.querySelectorAll('.elements__like');
//   likeBtns.forEach(function (likeBtns) {
//   likeBtns.addEventListener('click', function (evt) {
//     const targetLikeBtn = evt.target;
//     targetLikeBtn.classList.toggle('elements__like_active');
//     });
//   });
// }

// cardLikes();

// function newCardLike (elem) {
//   elem.querySelector('.elements__like').addEventListener('click', function (evt) {
//   evt.target.classList.toggle('elements__like_active');
//   });
// }
// // ---------

// // ---------Удаление карточек---------
// function deleteCard () {
//   const deleteBtns = document.querySelectorAll('.elements__delete');
//   deleteBtns.forEach(function (deleteBtns) {
//     deleteBtns.addEventListener('click', function (evt) {
//       const targetDeleteBtn = evt.target;
//       targetDeleteBtn.closest('.elements__card').remove();
//     });
//   });
// }

// deleteCard();
// ---------

// ---------Модалка с увеличенными картинками---------
// function togglePhotoPopup (evt) {
//   evt.preventDefault();
//   photoPopup.classList.toggle('popup_opened');
// }

// function determinatePhotoBtns () {
//   const photoBtns = document.querySelectorAll('.elements__photo');
//   photoBtns.forEach(function (evt) {
//   evt.addEventListener('click', togglePhotoPopup);
//   });
// }

// function zoomImage () {
//   const photoBtns = document.querySelectorAll('.elements__photo');
//   const currentPhoto = photoPopup.querySelector('.photo-popup__photo');
//   const currentName = photoPopup.querySelector('.photo-popup__name');
//   photoBtns.forEach(function (evt) {
//     evt.addEventListener('click', function(evt) {
//       evt.preventDefault(evt);
//       currentPhoto.src = evt.target.src;
//       currentPhoto.alt = evt.target.alt;
//       currentName.textContent = `${evt.target.parentElement.textContent}`;
//     });
//   });
//   determinatePhotoBtns();
// }

// zoomImage ();

// photoPopup.querySelector('#photoPopupCloseBtn').addEventListener('click', togglePhotoPopup);
// photoPopup.querySelector('.popup__overlay').addEventListener('click', togglePhotoPopup);
// ---------