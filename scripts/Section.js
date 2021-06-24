class Section {
    constructor({items, renderer}, containerSelector ) {
        this._items = items,
        this._renderer = renderer,
        this._containerSelector = containerSelector
    }

    renderAll {

    }

    addItem {
    this._containerSelector.append(this._renderer)
    }
}