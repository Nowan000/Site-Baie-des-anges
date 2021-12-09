const formRdv = document.querySelector('form');
const inpLastName = document.querySelector('input[name="nom"]');
const inpFirstName = document.querySelector('input[name="prenom"]');
const inpAddress = document.querySelector('input[name="adresse"]');
const inpDate = document.querySelector('input[name="date"]');
const inpMail = document.querySelector('input[name="mail"]');
const inpPhone = document.querySelector('input[name="phone"]');
const inpTime = document.querySelector('select');

formRdv.addEventListener('submit', e => {
    e.preventDefault();

    send(jsonToSend(objectToParse()));
});

objectToParse = () => {
    let rdv;
    let nom = inpLastName.value;
    let prenom = inpFirstName.value;
    let adresse = inpAddress.value;
    let date = inpDate.value;
    let heure = inpTime.value;
    let mail = inpMail.value;
    let phone = inpPhone.value;

    return (
        rdv = {
            nom: nom,
            prenom: prenom,
            adresse: adresse,
            mail: mail,
            phone: phone,
            date: date,
            heure: heure,
        }
    );
}

jsonToSend = (objToSend) => {
    return (JSON.stringify({
        nom: objToSend.nom,
        prenom: objToSend.prenom,
        adresse: objToSend.adresse,
        mail: objToSend.mail,
        phone: objToSend.phone,
        date: objToSend.date,
        heure: objToSend.heure,
    }));
}

send = (toSend) => {
    let send = new XMLHttpRequest();
    send.open(formRdv.method, formRdv.action, true);
    send.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    send.send(toSend);
    console.log(toSend);
}