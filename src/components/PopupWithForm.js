import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
    constructor({ popupSelector, onSubmit }) {
        super(popupSelector);
        this._onSubmit = onSubmit;
    }

    _getInputValue() {
        this._inputList = Array.from(this.formElement.querySelectorAll('.form__input'));
        this._formValues = {};
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        })
        return this._formValues;
    }


    setEventListeners() {
        super.setEventListeners();
        this.formElement = this.popup.querySelector('.form')
        this.formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._onSubmit(this._getInputValue());
        });

    }

    close() {
        super.close();
        this.formElement.reset();


    }
}