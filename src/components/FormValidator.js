
export class FormValidator {
    constructor(config, formElement) {
        this._config = config;
        this._formElement = formElement;
        this._inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
        this._buttonElement = this._formElement.querySelector(this._config.submitButtonSelector);
    }

    _hideInputError(inputElement) {
        const inputError = this._formElement.querySelector(`.${inputElement.id}-error`);

        inputElement.classList.remove(this._config.inputErrorClass);
        inputError.classList.remove(this._config.errorClass);
        inputError.textContent = '';
    };

    _showInputError(inputElement) {
        const inputError = this._formElement.querySelector(`.${inputElement.id}-error`);

        inputElement.classList.add(this._config.inputErrorClass);
        inputError.textContent = inputElement.validationMessage;
        inputError.classList.add(this._config.errorClass);
    };

    _hasInvalidInput = (inputList) => {
        return this._inputList.some(inputElement => !inputElement.validity.valid);
    };

    toggleButtonState() {
        if (this._hasInvalidInput()) {
            this._buttonElement.disabled = true;
        }
        else {
            this._buttonElement.disabled = false;
        }
    };

    _isValid(inputElement) {
        if (inputElement.validity.valid) {
            this._hideInputError(inputElement);
        }
        else {
            this._showInputError(inputElement);
        }
    };

    _setEventListeners() {
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._isValid(inputElement);
                this.toggleButtonState();
            });

        });
        this.toggleButtonState(this._buttonElement, this._inputList);
    };

    enableValidation() {
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this.resetValidation();
        });
        this._setEventListeners();
    };

    resetValidation() {
        this._inputList.forEach(inputElement => {
            this._hideInputError(inputElement)
        })
        this.toggleButtonState()
    };

}
