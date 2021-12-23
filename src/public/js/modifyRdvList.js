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
const hourSelect = modalUpdate.querySelector('select');
let oldNom, oldPrenom, oldAdresse, oldMail, oldPhone, oldDate, oldHeure;
let toUpdate;


//évènement qui appelle la suppression d'une entrée
formRdv.addEventListener('submit', e => {
    e.preventDefault();
    let id = e.submitter.classList[1];
    let mode = e.submitter.classList[0];


    if (mode === "delete") {
        modal.style.display = 'block';
        modalDelete.style.display = 'block';

    } else if (mode === 'update') {

        modal.style.display = 'block';
        modalUpdate.style.display = 'block';

        oldNom = document.querySelector('#nom_client').innerHTML;
        oldPrenom = document.querySelector('#prenom_client').innerHTML;
        oldAdresse = document.querySelector('#mail_client').innerHTML;
        oldMail = document.querySelector('#mail_client').innerHTML;
        oldPhone = document.querySelector('#phone_client').innerHTML;
        oldDate = document.querySelector('#date_rdv').attributes.formatDate.value;

        console.log(oldDate);
        oldHeure = document.querySelector('#heure_rdv').innerHTML;

    }

    yesDeleteBtn.addEventListener('click', () => {
        sendDelete(toJson(mode, id));

    });

    yesUpdateBtn.addEventListener('click', e => {
        let nom = inputNom.value;
        let prenom = inputPrenom.value;
        let adresse = inputAdresse.value;
        let mail = inputMail.value;
        let phone = inputPhone.value;
        let date = inputDate.value;
        let heure = hourSelect.value;

        console.log(mail);
        let upNom = (nom.trim() === "") ? oldNom : nom;
        let upPrenom = (prenom.trim() === "") ? oldPrenom : prenom;
        let upAdresse = (adresse.trim() === "") ? oldAdresse : adresse;
        let upMail = (mail.trim() === "") ? oldMail : mail;
        let upPhone = (phone.trim() === "") ? oldPhone : phone;
        let upDate = (date.trim() === "") ? oldDate : date;
        let upHeure = (heure.trim() === "") ? oldHeure : heure;

        console.log(upMail);
        let toUpdate = {
            id: id,
            nom: upNom,
            prenom: upPrenom,
            adresse: upAdresse,
            mail: upMail,
            phone: upPhone,
            date: upDate,
            heure: upHeure,
        }

        sendUpdate(toJson('update', toUpdate));
    });

    closeModal(mode);
});

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

//conversion de l'id à supprimer en JSON
toJson = (type, toParse) => {
    if (type === 'delete') {
        return (JSON.stringify({
            id: toParse,
        }));
    }
    if (type === 'update') {
        return (JSON.stringify({
            nom: toParse.nom,
            prenom: toParse.prenom,
            adresse: toParse.adresse,
            mail: toParse.mail,
            phone: toParse.phone,
            date: toParse.date,
            heure: toParse.heure,
            id: toParse.id,
        }));
    }
}

delayReload = (timer) => {
    window.setTimeout(function() {
        location.reload()
    }, timer);
}

sendDelete = (toSend) => {
    let send = new XMLHttpRequest(); //création de la requête
    send.open('POST', '/removeRdv', true); // défini la méthode et l'url de la requête
    send.setRequestHeader('Content-Type', 'application/json; charset=UTF-8'); // en-tête de la requête
    send.send(toSend);    //envoi de la requête, toSend contient l'id à supprimer sous forme de json
    delayReload(500);
}

sendUpdate = (toSend) => {
    let send = new XMLHttpRequest();
    send.open('POST', '/updateRdv', true);
    send.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    send.send(toSend);
    delayReload(500);
}