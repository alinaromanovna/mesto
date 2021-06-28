import {Popup} from './Popup.js'
export class PopupWithImage extends Popup {
    constructor (popupSelector) {
        super(popupSelector)

        this.nameCard = this.popup.querySelector('.popup-open-foto__figcaption'),
        this.linkCard = this.popup.querySelector('.popup-open-foto__img')
    }

    openPopup(data) { 
        this.linkCard.src = data.link;
        this.nameCard.textContent = data.name;
        this.nameCard.alt = data.name;
        super.openPopup();
        
    }
    
}