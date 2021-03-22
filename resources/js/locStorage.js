export default class locStorage {

    constructor() {

        if (document.querySelector('body.shop')) {
            this.domain_url = window.location.origin;
            this.button = document.querySelector('.fav');
            this.id = this.button.getAttribute("data-id");
            this.data = JSON.parse(localStorage.getItem("id")) || [];

            this.init();
            //this.DebugRS();
        }
        if (document.querySelector('body.favorites')) {
            this.curLat = '';
            this.curLng = '';
            this.domain_url = window.location.origin;
            this.hookAffiche = document.getElementById('favorite_list');
            //this.ViewStorage();
            this.Fetch('load','');
        }
        /*if (document.querySelector('body.account')) {
            this.domain_url = window.location.origin;
            //this.ViewStorage();
            this.Fetch('compare',localStorage.getItem('id'));
        }*/
    }

    init() {
        /*console.log(this.id);*/
        /*console.log(this.data);*/

        this.button.addEventListener("click", () => {

            this.AddStorage()

            this.DebugLS();

            this.Fetch('create', this.id);

            /*if(document.querySelector('body.fav'))
            {
                this.fetchData();
            }*/
        }, false);
    }

    AddStorage() {

        if (localStorage.getItem("id")) {
            this.FindInStorage()
        } else {
            this.data.push(this.id);
            localStorage.setItem("id", JSON.stringify(this.data));
            this.data.length = 0;
        }
    }

    ViewStorage() {
        if (localStorage.getItem("id")) {
            let tempData = JSON.parse(localStorage.getItem('id'));
            for (let i = 0; i < tempData.length; i++) {
                //console.log(tempData[i]);
                let shop = document.createElement('p')
                this.hookAffiche.appendChild(shop).innerText = tempData[i];
            }
        }
    }

    RemoveStorage() {
        localStorage.removeItem('id');
        localStorage.clear();
        this.data.length = 0;

    }

    FindInStorage() {
        let tempData = JSON.parse(localStorage.getItem('id'));
        for (let i = 0; i < tempData.length; i++) {
            /*console.log(this.id);
            console.log(tempData[i]);*/
            if (this.id === tempData[i]) {
                //console.log(localStorage.getItem('id'));
                console.log(this.id + ' ' + tempData[i]);
                return true;
            }
        }
        this.data.push(this.id);
        localStorage.setItem("id", JSON.stringify(this.data));
        this.data.length = 0;
        return false;
    }

    Fetch(type, idShop) {
        let url = this.domain_url + '/API/get_favorite';
        let token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

        if(type === 'load'){
            console.log('Loading Fav');

            let test = [{type: 'read'}];
            let dat = JSON.parse(localStorage.getItem("id"))
            test.push(dat);
            /*let test = JSON.parse(localStorage.getItem("id"));
            test.push({type: 'read'});*/
            //console.log(test);

            let ResTo = fetch(url, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "X-Requested-With": "XMLHttpRequest",
                    "X-CSRF-Token": token
                },
                method: "post",
                credentials: "same-origin",
                body: JSON.stringify(test)
            }).then(response => {
                return response.json();
            }).then(objected => {
                console.log(objected);
                this.FormAffiche(objected);
            }).catch(error => alert("Erreur : " + error));

        } else if(type === 'create') {
            console.log('Enregistement Fav');

            let test = [{type: 'create',id: idShop}];
            console.log(test);

            let ResTo = fetch(url, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "X-Requested-With": "XMLHttpRequest",
                    "X-CSRF-Token": token
                },
                method: "post",
                credentials: "same-origin",
                body: JSON.stringify(test)
            }).then(response => {
                return response.json();
            }).then(objected => {
                console.log(objected);
            }).catch(error => alert("Erreur : " + error));
        } else if(type === 'remove') {
            console.log('Remove Fav');

            let test = [{type: 'remove',id: idShop}];
            console.log(test);

            let ResTo = fetch(url, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "X-Requested-With": "XMLHttpRequest",
                    "X-CSRF-Token": token
                },
                method: "post",
                credentials: "same-origin",
                body: JSON.stringify(test)
            }).then(response => {
                return response.json();
            }).then(objected => {
                console.log(objected);
            }).catch(error => alert("Erreur : " + error));
        } if(type === 'compare') {
            console.log('compare Fav');

            let test = [{type: 'compare',shop: idShop}];
            console.log(test);

            let ResTo = fetch(url, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "X-Requested-With": "XMLHttpRequest",
                    "X-CSRF-Token": token
                },
                method: "post",
                credentials: "same-origin",
                body: JSON.stringify(test)
            }).then(response => {
                return response.json();
            }).then(objected => {
                console.log(objected);
            }).catch(error => alert("Erreur : " + error));
        }
    }

    FormAffiche(objected){
        //console.log(typeof objected);
        if(typeof objected === 'string'){
            let formTab = '<h1 class="text-center"> Vous n\'avez aucun commerce en favoris, ajoutez-en ! </h1>';
            this.hookAffiche.innerHTML = formTab;
        } else if (typeof objected === 'object') {
            let formTab = '<h1 class="text-center"> Vos commerces favoris : </h1>';
            formTab += '<ul class="list-group list-group-flush">'

            for (let i = 0; i < objected.length; i++) {
                //console.log(objected[i]);
                formTab += '<li class="list-group-item">';

                formTab += 'Nom = '+objected[i].nom+'<br/>';
                formTab += 'Adresse = '+objected[i].adresse+' à '+objected[i].Cit_nom+' ('+objected[i].Cit_cp+')<br/>';
                formTab += 'Type = '+objected[i].Cat_libelle+' / '+objected[i].SubCat_libelle+'<br/>';
                formTab += '<a class="btn btn-outline-primary btn-sm mr-3" href="'+this.domain_url+'/shop/'+objected[i].id+'" role="button">Voir la page</a>';

                /*if (navigator.geolocation) {
                    //console.log('connexion securisée');
                    formTab += navigator.geolocation.getCurrentPosition((position)=>{
                        this.curLat = position.coords.latitude;
                        this.curLng = position.coords.longitude;
                        //formTab += '<a class="btn btn-outline-primary btn-sm mr-3" href="'+this.domain_url+'/shop/'+objected[i].id+'" role="button">Plans</a>';
                        return '<a class="btn btn-outline-primary btn-sm ml-3" href="https://www.google.fr/maps/dir/'+this.curLat+','+this.curLng+'/44.5473755,6.0655453/@44.9119248,5.8415774,10.25z/" role="button">Google Maps</a>';
                    }, (position) => { console.log('connexion non securisée =>'+position.message);return 'yes'; });
                }*/

                formTab += '<a class="btn btn-outline-danger btn-sm btn-circle ml-3" data-id="'+objected[i].id+'" role="button"> X </a>';
                formTab += '</li>';
            }

            this.hookAffiche.innerHTML = formTab;

            document.querySelectorAll('a.btn.btn-outline-danger.btn-sm.btn-circle.ml-3').forEach((a) => {
                a.addEventListener('click', (ev) =>{
                    let id = ev.currentTarget.getAttribute('data-id');
                    console.log(id);
                    this.removeFav(id);
                    //this.Fetch('load');
                });
            });
        }
    }

    removeFav(id){
        //href="'+this.domain_url+'/API/remove_favorite/'+objected[i].id+'"
        //console.log(this.data);
        let tempData = JSON.parse(localStorage.getItem('id'));
        //console.log(tempData);
        for (let i = 0; i < tempData.length; i++) {
            if (id === tempData[i]) {
                console.log('dans le tableau');
                //console.log(id);
                const index = tempData.indexOf(tempData[i]);
                if (index > -1) {
                    tempData.splice(index, 1);
                }

                //console.log(id + ' ' + tempData[i]);
                console.log(tempData);
                this.data = [];
                this.data = tempData;
                localStorage.setItem("id", JSON.stringify(this.data));

                //localStorage.setItem("id", JSON.stringify(tempData));
                //return this.removeFav(id);
                document.location.reload();
            }
        }
        return 'pas dans le tableau';
    }

    DebugRS() {
        localStorage.removeItem('id');
        localStorage.clear();
        this.data = [];
    }

    DebugLS() {
        console.log(localStorage.getItem('id'));
    }
}
