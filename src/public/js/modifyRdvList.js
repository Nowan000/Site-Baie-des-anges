const body = document.querySelector('body');
const formRdv = document.querySelector('form');
const modal = document.querySelector('.modal');
const modalDelete = document.querySelector('.modal-delete');
const modalUpdate = document.querySelector('.modal-update');
const yesDeleteBtn = document.querySelector('#yesDeleteBtn');
const yesUpdateBtn = document.querySelector('#yesUpdateBtn');
const allInputs = modalUpdate.querySelectorAll('input');
const inputNom = document.querySelector('input[name="nom"]');
const inputPrenom = document.querySelector('input[name="prenom"]');
const inputAdresse = document.querySelector('input[name="adresse"]');
const inputMail = document.querySelector('input[name="mail"]');
const inputPhone = document.querySelector('input[name="phone"]');
const inputDate = document.querySelector('input[name="date"]');
const hourSelect = modalUpdate.querySelector('select[name="heure"]');
const prestaSelect = modalUpdate.querySelector('select[name="prestation"]')
let oldNom, oldPrenom, oldAdresse, oldMail, oldPhone, oldDate, oldHeure, oldPresta;
let toUpdate;



formRdv.addEventListener('submit', e => {
    e.preventDefault();
    let id = e.submitter.classList[1];
    let mode = e.submitter.classList[0];

    if (mode === "delete") {
        modal.style.display = 'block';
        modalDelete.style.display = 'block';

    } else if (mode === 'update') {

        //affichage de la modale
        modal.style.display = 'block';
        modalUpdate.style.display = 'block';

        //récupération des anciennes informations du rendez-vous
        oldNom = document.querySelector('.nom_client').innerHTML;
        oldPrenom = document.querySelector('.prenom_client').innerHTML;
        oldAdresse = document.querySelector('.mail_client').innerHTML;
        oldMail = document.querySelector('.mail_client').innerHTML;
        oldPhone = document.querySelector('.phone_client').innerHTML;
        oldDate = document.querySelector('.date_rdv').attributes.formatDate.value;
        oldHeure = document.querySelector('.heure_rdv').innerHTML;
        oldPresta = document.querySelector('.prestation').innerHTML;
    }

    //Évènement au clic sur le bouton "Oui" de la modale.
    yesDeleteBtn.addEventListener('click', () => {
        //Envois de l'id vers la méthode toJson() puis le JSON vers la méthode send()
        send(mode, toJson(mode, id));
    });

    //Évènement au clic sur le bouton "Oui" de la modale.
    yesUpdateBtn.addEventListener('click', e => {
        //récupération des informations modifiées
        let nom = inputNom.value;
        let prenom = inputPrenom.value;
        let adresse = inputAdresse.value;
        let mail = inputMail.value;
        let phone = inputPhone.value;
        let date = inputDate.value;
        let heure = hourSelect.value;
        let prestation = prestaSelect.value;

        //comparaison entre les anciennes et les nouvelles informations
        let upNom = (nom.trim() === "") ? oldNom : nom;
        let upPrenom = (prenom.trim() === "") ? oldPrenom : prenom;
        let upAdresse = (adresse.trim() === "") ? oldAdresse : adresse;
        let upMail = (mail.trim() === "") ? oldMail : mail;
        let upPhone = (phone.trim() === "") ? oldPhone : phone;
        let upDate = (date.trim() === "") ? oldDate : date;
        let upHeure = (heure === "") ? oldHeure : heure;
        let upPresta = (prestation === "") ? oldPresta: prestation;

        //création d'un objet contenant toutes les informations après comparaison pour éviter des champs vides
        let toUpdate = {
            id: id,
            nom: upNom,
            prenom: upPrenom,
            adresse: upAdresse,
            mail: upMail,
            phone: upPhone,
            date: upDate,
            heure: upHeure,
            prestation: upPresta,
        }
        //envois de l'objet vers la méthode toJson() puis du JSON vers la méthode send()
        send(mode, toJson(mode, toUpdate));
    });

    closeModal(mode);
});


toJson = (type, toParse) => {
    //le type 'delete' convertit l'id en objet JSON et retourne cet objet avec
    if (type === 'delete') {
        return (JSON.stringify({
            id: toParse,
        }));
    }
    //le type 'update' converti les informations modifiées en objet JSON et retourne cet objet
    if (type === 'update') {
        console.log(toParse);
        return (JSON.stringify({
            nom: toParse.nom,
            prenom: toParse.prenom,
            adresse: toParse.adresse,
            mail: toParse.mail,
            phone: toParse.phone,
            date: toParse.date,
            heure: toParse.heure,
            prestation: toParse.prestation,
            id: toParse.id,
        }));
    }
}

// Retarde le rechargement de la page pour laisser le temps d'envoyer la requête vers le serveur
delayReload = (timer) => {
    window.setTimeout(function() {
        location.reload()
    }, timer);
}

//envoi du JSON contenant l'id du rendez-vous à supprimer
send = (mode, toSend) => {
    let send = new XMLHttpRequest(); //création de la requête
    if (mode === "delete") {
        send.open('POST', '/removeRdv', true); // défini la méthode et l'url de la requête
    } else if (mode === 'update') {
//envoi du JSON contenant les informations du rendez-vous qui ont été modifiées
        send.open('POST', '/updateRdv', true);        
    }
    send.setRequestHeader('Content-Type', 'application/json; charset=UTF-8'); // en-tête de la requête
        send.send(toSend);    //envoi de la requête, toSend contient l'id à supprimer sous forme de json
        delayReload(500);
}

//Fermer la modale
closeModal = (mode) => {
    const closeElements = document.querySelectorAll('.close');
    closeElements.forEach(element => {
        element.addEventListener('click', () => {
            modal.style.display = 'none';
            if (mode === "delete") {
                modalDelete.style.display = 'none';
            } else if (mode === 'update') {
                modalUpdate.style.display = 'none';

                allInputs.forEach(input => {
                    input.textContent = "";
                });
            }
        });
    });

    window.addEventListener('click', e => {
        if (e.target.className === 'modal') {
            modal.style.display = 'none';
            if (mode === "delete") {
                modalDelete.style.display = 'none';
            } else if (mode === 'update') {
                modalUpdate.style.display = 'none';

                allInputs.forEach(input => {
                    input.textContent = "";
                });
            }
        }
    });
}