import DbConnection from "./db";

const getAllRdv = async () => {
    const connection = new DbConnection();
    return await connection.performQuery("SELECT * FROM rendez_vous", []);
};

const addRdv = async (nomClient, prenomClient, adresseClient, dateRdv, heureRdv) => {
    const connection = new DbConnection();
    return await connection.performQuery("INSERT INTO `rendez_vous` (nom_client, prenom_client, adresse_client, date_rdv, heure_rdv) values (?,?,?,?,?)", [nomClient, prenomClient, adresseClient, dateRdv, heureRdv])
}

export default {
    getAllRdv,
    addRdv
}