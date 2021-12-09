const formDelete = document.querySelector('form');
const modal = document.querySelector('#myModal');
const span = document.querySelector('.close');
const yesButton = document.querySelector('#yes');
const noButton = document.querySelector('#no');

let id;

//évènement qui appelle la suppression d'une entrée
formDelete.addEventListener('submit', e => {
    e.preventDefault();
    id = e.submitter.id; //id de l'entrée à supprimer dans la base de donnée
    modal.style.display = "block";

    span.addEventListener('click', () => {
        modal.style.display = "none";
    });

    window.addEventListener('click', e => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });

    yesButton.addEventListener('click', () => {
        send(toJson(id));// conversion en JSON de l'id puis envois de la requête contenant l'id vers le serveur
        location.reload(); //force le rafraîchissement de la page
    });

    noButton.addEventListener('click', () => {
        span.click(); //simule un click sur l'élément span
    });

});

//conversion de l'id à supprimer en JSON
toJson = (toParse) => {
    return (JSON.stringify({
        id: toParse,
    }));
}

//envoi de la requête de supression contenant l'id
send = (toSend) => {
    let send = new XMLHttpRequest(); //création de la requête
    send.open('POST', '/removeRdv', true); // défini la méthode et l'url de la requête
    send.setRequestHeader('Content-Type', 'application/json; charset=UTF-8'); // en-tête de la requête
    send.send(toSend); //envoi de la requête, toSend contient l'id à supprimer sous forme de json
    console.log(toSend);
}

