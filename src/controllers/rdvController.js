import dbRendezVous from "../db/rendezVousDb";

async function getAllRdv(req,res) {
    let result = await dbRendezVous.getRdv();
    res.status(200).render('pages/touslesrdv',{rdv: result.rows});
}

async function addRdv(req,res) {
    const { date, heure, id_client } = req.body;

    if(nom !== null && heure !== null) {
        const result = await rdvDb.addRdv(date, heure, idClient)
    }
}