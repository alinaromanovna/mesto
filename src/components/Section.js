export class Section {
    constructor(renderer, containerSelector) {
        this._renderer = renderer,
            this._element = document.querySelector(containerSelector)
    }

    renderAll(items) {

        items.forEach(item => this._renderer(item));
    }

    addItem(cardData) {
        this._element.prepend(cardData);
    }
}