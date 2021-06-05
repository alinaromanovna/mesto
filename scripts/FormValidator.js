 
// const hideInputError = (formElement, inputElement, config) => {
//     const { inputErrorClass, errorClass } = config;
//     const inputError = formElement.querySelector(`.${inputElement.id}-error`);

//     inputElement.classList.remove(inputErrorClass);
//     inputError.classList.remove(errorClass);
//     inputError.textContent = ''; 
// }

// const showInputError = (formElement, inputElement, config) => {
//     const { inputErrorClass, errorClass } = config;
//     const inputError = formElement.querySelector(`.${inputElement.id}-error`);

//     inputElement.classList.add(inputErrorClass);
//     inputError.textContent = inputElement.validationMessage;
//     inputError.classList.add(errorClass);
// }
 
// const isValid = (formElement, inputElement, config) => {
//      if (inputElement.validity.valid) {
//         hideInputError(formElement, inputElement, config);
//     }
//     else {
//         showInputError(formElement, inputElement, config);
//     }
// };

// const hasInvalidInput = (inputList) => {
//     return inputList.some(inputElement => !inputElement.validity.valid);
// };

// const toggleButtonState = (buttonElement, inputList) => {
//     if (hasInvalidInput(inputList)) {
//        buttonElement.disabled = true;
//     }
//     else {
//         buttonElement.disabled = false;
//     }


// const setEventListeners = (formElement, config) => {
//     const { inputSelector, submitButtonSelector, ...restConfig } = config;

//     formElement.addEventListener('submit', (evt) => {
//       evt.preventDefault();
//     });
  
//     const inputList = Array.from(formElement.querySelectorAll(inputSelector));
//     const buttonElement = formElement.querySelector(submitButtonSelector);
    
//     inputList.forEach((inputElement) => {
//          inputElement.addEventListener('input', () => {
//            isValid(formElement, inputElement, restConfig);
//            toggleButtonState(buttonElement, inputList);
//            });

//        });
//     toggleButtonState(buttonElement, inputList);
// };


// const enableValidation = ({ formSelector, ...restConfig }) => {
//     const formList = Array.from(document.querySelectorAll(formSelector));

//     formList.forEach((formElement) => {
//         setEventListeners(formElement, restConfig); 
//     });
// };


export default class FormValidator {
    constructor (config, formElement) {
         this._config = config;
         this._formElement = formElement;
         this._inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
        this._buttonElement = this._formElement.querySelector(this._config.submitButtonSelector);
    }


_setEventListeners() {
    this._inputList.forEach((inputElement) => {
         inputElement.addEventListener('input', () => {
           this._isValid(inputElement);
           this.toggleButtonState();
           });

       });
    this.toggleButtonState();
}; 

_isValid (inputElement) {
    if (inputElement.validity.valid) {
       this._hideInputError(inputElement);
   }
   else {
       this._showInputError(inputElement);
   }
};

_hasInvalidInput = (inputList) => {
    return this._inputList.some(inputElement => !inputElement.validity.valid);
};

_hideInputError (inputElement) {
    const inputError = this._formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.remove(this._config.inputErrorClass);
    inputError.classList.remove(this._config.errorClass);
    inputError.textContent = ''; 
}

_showInputError (inputElement) {
    const inputError = this._formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.add(this._config.inputErrorClass);
    inputError.textContent = inputElement.validationMessage;
    inputError.classList.add(this._config.errorClass);
}

toggleButtonState () {
    if (hasInvalidInput(this._inputList)) {
       this._buttonElement.disabled = true;
    }
    else {
        this._buttonElement.disabled = false;
    }
}

enableValidation() {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
     });
    this._setEventListeners();   
}

}
