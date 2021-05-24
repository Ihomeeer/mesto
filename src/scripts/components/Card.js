//Класс отвечает за создание карточек на странице
export default class Card {
  constructor(data, cardSelector, handleCardClick, openPopupCallback) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._id = data._id;
    this._owner = data.owner._id;
    this._currentUserId = '453525cde60476829f73e874';
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._openPopupCallback = openPopupCallback;
    this.element = this._getTemplate();
    this._newCardName = this.element.querySelector('.elements__name');
    this._newCardPhoto = this.element.querySelector('.elements__photo');
    this._newCardLikeBtn = this.element.querySelector('.elements__like');
    this._newCardDeleteBtn = this.element.querySelector('.elements__delete');
    this._newCardLikesCounter = this.element.querySelector('.elements__like-counter');
  }

  //создание карточки
  createCard() {
    this._newCardName.textContent = this._name;
    this._newCardPhoto.src = this._link;
    this._newCardPhoto.alt = this._name;
    this._checkValidity();
    this._setListeners();
    this._getLikes();
    return this.element;
  }

  //разметка
  _getTemplate() {
    const _cardElement = document.querySelector(this._cardSelector)
      .content
      .querySelector('.elements__card')
      .cloneNode(true);

    return _cardElement;
  }

  getId() {
    return this._id;
  }

  //лайки - реализация клика на иконку
  _likeCard (evt) {
    const _targetLikeBtn = evt.target;
    _targetLikeBtn.classList.toggle('elements__like_active');
  }
  //лайки - счетчик
  _getLikes() {
    this._newCardLikesCounter.textContent = this._likes.length;
  }

  _checkValidity() {
    if (this._currentUserId === this._owner) {
      this._newCardDeleteBtn.classList.remove('elements__delete_invisible');
    }
  }
  //удаление
  deleteCard() {
    this.element.remove()
  }

  //слушатели
  _setListeners = () => {
    this._newCardLikeBtn.addEventListener('click', (evt) => this._likeCard(evt));
    this._newCardDeleteBtn.addEventListener('click', () => {
      this._openPopupCallback(this._id);
    });
    this._newCardPhoto.addEventListener('click', () => {
    this._handleCardClick(this._name, this._link);
    });
  }
}
