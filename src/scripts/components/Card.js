//Класс отвечает за создание карточек на странице
export default class Card {
  constructor({name, link}, cardSelector, handleCardClick) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this.element = this._getTemplate();
    this._newCardName = this.element.querySelector('.elements__name');
    this._newCardPhoto = this.element.querySelector('.elements__photo');
    this._newCardLikeBtn = this.element.querySelector('.elements__like');
    this._newCardDeleteBtn = this.element.querySelector('.elements__delete');
  }

  //создание карточки
  createCard() {
    this._newCardName.textContent = this._name;
    this._newCardPhoto.src = this._link;
    this._newCardPhoto.alt = this._name;
    this._setListeners();
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

  //лайки
  _likeCard (evt) {
    const _targetLikeBtn = evt.target;
    _targetLikeBtn.classList.toggle('elements__like_active');
  }

  //удаление
  _deleteCard (evt) {
    const _targetDeleteBtn = evt.target;
    _targetDeleteBtn.closest('.elements__card').remove();
  }

  //слушатели
  _setListeners = () => {
    this._newCardLikeBtn.addEventListener('click', (evt) => this._likeCard(evt));
    this._newCardDeleteBtn.addEventListener('click', (evt) => this._deleteCard(evt));
    this._newCardPhoto.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }
}
