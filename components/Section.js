export default class Section {
  constructor ({initialCards, renderer}, containerSelector) {
    this._items = initialCards;
    console.log(this._items)
    this._renderer = renderer;
    console.log(this._renderer)
    this._container = containerSelector;
  }

  renderItems () {
    this._items.forEach((item) => {
      console.log(item);
      console.log(this._renderer)
      this._renderer(item, this._container, '.place-card');
    });
  }

  addItem (item) {
    this._renderer(item, this._container)
  }
}