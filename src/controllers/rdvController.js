import rendezVousDb from "../db/rendezVousDb";

async function getRdv(req, res) {
    let result = await rendezVousDb.selectAllRdv();

    res.status(200).render('pages/rendez-vous', {rdvs: result.rows});
}

async function addRdv(req, res) {
    const {nom, prenom, adresse, mail, phone, date, heure, prestation} = req.body;
    if (nom !== null && prenom !== null && adresse !== null && mail !== null && phone !== null && heure !== null && date !== null && prestation !== null) {
        const result = await rendezVousDb.insertRdv(nom, prenom, adresse, mail, phone, date, heure, prestation);
    }
}

async function removeOne(req, res) {
    const id = req.body.id;
    const result = await rendezVousDb.removeOne(id);
}

async function updateRdv(req, res) {
    const {nom, prenom, adresse, mail, phone, date, heure, prestation, id} = req.body;
    const result = await rendezVousDb.updateRdv(nom, prenom, adresse, mail, phone, date, heure, prestation, id);
}

export default {
    getRdv,
    addRdv,
    removeOne,
    updateRdv,
};