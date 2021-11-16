CREATE TABLE IF NOT EXISTS rendez_vous
(
    id             bigint      NOT NULL AUTO_INCREMENT,
    nom_client     varchar(50) NOT NULL,
    prenom_client  varchar(50) NOT NULL,
    adresse_client text        NOT NULL,
    date_rdv       date        NOT NULL,
    heure_rdv      time        NOT NULL,
    PRIMARY KEY (id)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb3;