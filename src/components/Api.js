export class Api {
    constructor({ baseUrl, headers }) {
        this._url = baseUrl,
            this._headers = headers
    }
    _checkRes(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`)
    }


    getInitialCards() {
        return fetch(`${this._url}/cards`, {
            headers: this._headers
        })
            .then(res => this._checkRes(res))

    }

    getUserInfo() {
        return fetch(`${this._url}/users/me`, {
            headers: this._headers
        })
            .then(res => this._checkRes(res))
    }



    editProfile(name, about) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                about: about
            })
        })
            .then(res => this._checkRes(res))
    }

    addNewCard(name, link) {
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                link: link
            })
        })
            .then(res => this._checkRes(res))
    }
    deleteCard(idCard) {
        return fetch(`${this._url}/cards/${idCard}`, {
            method: 'DELETE',
            headers: this._headers
        })
            .then(res => this._checkRes(res))
    }

    setLike(idCard) {
        return fetch(`${this._url}/cards/likes/${idCard}`, {
            method: 'PUT',
            headers: this._headers
        })
            .then(res => this._checkRes(res))
    }

    deleteLike(idCard) {
        return fetch(`${this._url}/cards/likes/${idCard}`, {
            method: 'DELETE',
            headers: this._headers
        })
            .then(res => this._checkRes(res))
    }
    updateAvatar(url) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: url
            })
        })
            .then(res => this._checkRes(res))
    }

}
