import DbConnection from "./db";

const selectAllRdv = async () => {
    const connection = new DbConnection();
    return await connection.performQuery('SELECT * FROM rendez_vous', []);
};

const insertRdv = async (nom, prenom, adresse, mail, phone, date, heure, prestation) => {
    const connection = new DbConnection();
    return await connection.performQuery(
        "INSERT INTO `rendez_vous` (nom_client, prenom_client, adresse_client, mail_client, phone_client, date_rdv, heure_rdv, prestation) values (?,?,?,?,?,?,?,?)"
        , [nom, prenom, adresse, mail, phone, date, heure, prestation]
    );
}

const removeOne = async (id) => {
    const connection = new DbConnection();
    return await connection.performQuery(
        "DELETE FROM `rendez_vous` WHERE id = (?)"
        , [id]
    );
}

const updateRdv = async (nom, prenom, adresse, mail, phone, date, heure, prestation, id) => {
    const connection = new DbConnection();
    return await connection.performQuery(
        "UPDATE `rendez_vous` SET `nom_client` = (?), `prenom_client` = (?), `adresse_client` = (?), `mail_client` = (?), `phone_client` = (?), `date_rdv` = (?),`heure_rdv` = (?), `prestation` = (?) WHERE id = (?)"
        , [nom, prenom, adresse, mail, phone, date, heure, prestation, id,]
    );
}

export default {
    selectAllRdv,
    insertRdv,
    removeOne,
    updateRdv,
}