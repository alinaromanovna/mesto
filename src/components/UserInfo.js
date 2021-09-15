export class UserInfo {
    constructor({ name, about, avatar }) {
        this._dataSelectorName = name,
            this._dataSelectorAbout = about,
            this._avatar = avatar,
            this._userName = document.querySelector(this._dataSelectorName),
            this._userAbout = document.querySelector(this._dataSelectorAbout),
            this._userAvatar = document.querySelector(this._avatar)
    }

    getUserInfo() {
        this._userData = {
            name: this._userName.textContent,
            about: this._userAbout.textContent
        }

        return this._userData;
    }

    setUserInfo(data) {
        this._userName.textContent = data.name;
        this._userAbout.textContent = data.about;

    }
    setUserAvatar(link) {
        this._userAvatar.style.backgroundImage = `url(${link})`
    }
}