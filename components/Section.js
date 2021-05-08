export default class Section {
  constructor ({item, renderer}, containerSelector) {
    this._items = item;
    this._renderer = renderer;
    this._container = containerSelector;
  }

  renderItems () {
    this._items.forEach((item) => {
      this._renderer(item, this._container);
    });
  }

  addItem (item) {
    this._renderer(item, this._container);
  }
}