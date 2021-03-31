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



//---------функция создания карточки---------
  function createCard (name, link) {
    let item = {
      name: name.value,
      link: link.value
    };
  const newCard = cardTemplate.querySelector('.elements__card').cloneNode(true);
  const newCardName = newCard.querySelector('.elements__name');
  const newCardPhoto = newCard.querySelector('.elements__photo');
  const newCardLikeBtn = newCard.querySelector('.elements__like');
  const newCardDeleteBtn = newCard.querySelector('.elements__delete');
  newCardName.textContent = name.value;
  newCardPhoto.src = link.value;
  console.log(newCardName, newCardPhoto.src)
  cardGrid.prepend(newCard);
  cardLike(newCardLikeBtn);
  cardDelete(newCardDeleteBtn);
  cardZoom(newCardPhoto);
  // return newCard;
}
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
// ---------модальное окно добавления карточек---------
//сбрасывание значений инпутов после отправки
function resetValues () {
  placePopup.querySelector('#placeForm').reset();
}
//функция отправки формы
function formSubmitHandlerPlace (evt) {
  evt.preventDefault();
  const name = placePopup.querySelector('#placePopupName');
  const link = placePopup.querySelector('#placePopupLink');
  createCard(name, link);
  closePopup(placePopup);
  resetValues();
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
// ---------модальное окно с зумом---------
// открытие модального окна
function cardZoom (elem) {
  elem.addEventListener('click', function () {
    openPopup(photoPopup);
    const currentPhoto = photoPopup.querySelector('.photo-popup__photo');
    const currentName = photoPopup.querySelector('.photo-popup__name');
    currentPhoto.src = elem.src;
    currentPhoto.alt = elem.alt;
    currentName.textContent = newCardPhoto.textContent;
  })
}

// // newCardPhoto


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
// ---------модальное окно для нового места---------
document.querySelector('.profile__add-button').addEventListener('click', function () {
  openPopup(placePopup);
});
placePopup.addEventListener('submit', formSubmitHandlerPlace);
placePopup.querySelector('#placePopupCloseBtn').addEventListener('click', function () {
  closePopup(placePopup);
});
placePopup.querySelector('.popup__overlay').addEventListener('click', function () {
  closePopup(placePopup);
});





































// const photoPopup = document.querySelector('.photo-popup');

// // ---------

// // ---------6 начальных карточек---------


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
//

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