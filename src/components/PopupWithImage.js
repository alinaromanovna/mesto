import { Popup } from './Popup.js'
export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector)

        this.nameCard = this.popup.querySelector('.popup-open-foto__figcaption'),
            this.linkCard = this.popup.querySelector('.popup-open-foto__img')
    }

    open(name, link) {
        this.linkCard.src = link;
        this.nameCard.textContent = name;
        this.nameCard.alt = name;
        super.open();

    }

}