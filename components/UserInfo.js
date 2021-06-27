export class UserInfo {
    constructor({ name, job }) {
        this._dataSelectorName = name,
        this._dataSelectorJob = job,
        this._userName = document.querySelector(this._dataSelectorName),
        this._userJob = document.querySelector(this._dataSelectorJob)
    }

    getUserInfo() {
        this._userData = {
            name: this._userName.textContent,
            job: this._userJob.textContent
        }

        return this._userData;
    }

    setUserInfo(data) {
        this._userName.textContent = data.name;
    	this._userJob.textContent = data.job;
          
    }
}