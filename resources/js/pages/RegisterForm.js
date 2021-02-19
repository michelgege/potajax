export default class RegisterForm {

    constructor() {
        if(document.querySelector('body.register')) {
            this.initEls()
            this.initEvents()
        } else return

        this.config = {
            api_endpoint : 'https://api-adresse.data.gouv.fr/search/?q='
        }
        this.selectedItem = 0
        this.adresses = []
        console.log(window.location)
    }

    initEls() {
        this.els = {
            managerButton : document.querySelector('.js-manager-button'),
            managerInputsContainer : document.querySelector('.js-manager-inputs'),
        }
    }

    initEvents() {
        this.initManagerForm()
    }

    initManagerForm() {
        if (this.els.managerButton.checked) {
            this.els.managerInputsContainer.querySelectorAll('input').forEach(input => {
                input.removeAttribute('disabled')
            })
        }

        this.els.managerButton.addEventListener('click', () => {
            if (this.els.managerButton.checked) {
                this.els.managerInputsContainer.classList.remove('hidden')
                this.els.managerInputsContainer.querySelectorAll('input').forEach(input => {
                    input.removeAttribute('disabled')
                })
            } else {
                this.els.managerInputsContainer.classList.add('hidden')
                this.els.managerInputsContainer.querySelectorAll('input').forEach(input => {
                    input.setAttribute('disabled', '')
                })
            }
        })
    }
}
