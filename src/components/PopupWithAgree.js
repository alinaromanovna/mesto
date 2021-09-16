import { Popup } from './Popup.js';

export class PopupWithAgree extends Popup {
    constructor({ popupSelector, onSubmit }) {
        super(popupSelector)
        this._onSubmit = onSubmit,
            this._form = this.popup.querySelector('.form')

    }
    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault()
            this._onSubmit(this._cardId, this.card)

        })
    }
    open(id, card) {
        this.card = card;
        this._cardId = id;
        super.open();
    }

}