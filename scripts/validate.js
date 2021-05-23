 
const hideInputError = (formElement, inputElement, config) => {
    const { inputErrorClass, errorClass } = config;
    const inputError = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.remove(inputErrorClass);
    inputError.classList.remove(errorClass);
    inputError.textContent = ''; 
}

const showInputError = (formElement, inputElement, config) => {
    const { inputErrorClass, errorClass } = config;
    const inputError = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.add(inputErrorClass);
    inputError.textContent = inputElement.validationMessage;
    inputError.classList.add(errorClass);
}
 
const isValid = (formElement, inputElement, config) => {
     if (inputElement.validity.valid) {
        hideInputError(formElement, inputElement, config);
    }
    else {
        showInputError(formElement, inputElement, config);
    }
};

const hasInvalidInput = (inputList) => {
    return inputList.some(inputElement => !inputElement.validity.valid);
};

const toggleButtonState = (buttonElement, inputList) => {
    if (hasInvalidInput(inputList)) {
       buttonElement.disabled = true;
    }
    else {
        buttonElement.disabled = false;
    }
}; 

const setEventListeners = (formElement, config) => {
    const { inputSelector, submitButtonSelector, ...restConfig } = config;

    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
  
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(submitButtonSelector);
    
    inputList.forEach((inputElement) => {
         inputElement.addEventListener('input', () => {
           isValid(formElement, inputElement, restConfig);
           toggleButtonState(buttonElement, inputList);
           });

       });
    toggleButtonState(buttonElement, inputList);
};


const enableValidation = ({ formSelector, ...restConfig }) => {
    const formList = Array.from(document.querySelectorAll(formSelector));

    formList.forEach((formElement) => {
        setEventListeners(formElement, restConfig); 
    });
};

  
