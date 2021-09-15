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
            this._onSubmit(evt, this._card)

        })
    }
    open(card) {
        this._card = card;
        super.open();
    }

}