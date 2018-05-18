import * as Joi from 'joi';

export const studentSchema = {
    promotion: Joi.string(),
    sexe: Joi.string(),
    nom: Joi.string().min(3).max(30),
    prenom: Joi.string().min(3).max(60),
    securiteSociale: Joi.string().min(13).max(15),
    numeroEtudiant: Joi.string().regex(/[0-9]{8}/),
    email: Joi.string().email(),
    dateNaissance: Joi.string().regex(/^(0?[1-9]|[12][0-9]|3[01])[\/](0?[1-9]|1[012])[\/\-]\d{4}$/),
    telephone: Joi.string().regex(/^\+(?:[0-9]●?){6,14}[0-9]$/),
    adresse: Joi.string().min(5),
    assurance: Joi.string().min(2),
    numeroPolice: Joi.string().min(2),
};

export const internshipSchema = {
    intituleStage: Joi.string().min(2),
    descriptionStage: Joi.string().min(20),
    dateDebutStage: Joi.string().regex(/^(0?[1-9]|[12][0-9]|3[01])[\/](0?[1-9]|1[012])[\/\-]\d{4}$/),
    dateFinStage: Joi.string().regex(/^(0?[1-9]|[12][0-9]|3[01])[\/](0?[1-9]|1[012])[\/\-]\d{4}$/),
    dureeHebdoStage: Joi.string().min(10),
    horairesStage: Joi.string().min(10),
    presenceFree: Joi.string().min(2),
    gratificationStage: Joi.string().min(2),
    typeRemuneration: Joi.string().min(2),
    avantagesStage: Joi.string().min(2)
}

export const concernedSchema = {
    sexeEncadrant: Joi.string(),
    nomEncadrant: Joi.string().min(2),
    prenomEncadrant: Joi.string().min(2),
    emailEncadrant: Joi.string().email(),
    telephoneEncadrant: Joi.string().regex(/^\+(?:[0-9]●?){6,14}[0-9]$/),
    qualiteEncadrant: Joi.string().min(2),
    sexeTuteur: Joi.string(),
    nomTuteur: Joi.string().min(2),
    prenomTuteur: Joi.string().min(2),
    emailTuteur: Joi.string().email(),
    telephoneTuteur: Joi.string().regex(/^\+(?:[0-9]●?){6,14}[0-9]$/),
    qualiteTuteur: Joi.string().min(2)
};

export const companySchema = {
    nomEntreprise: Joi.string().min(2),
    siteWebEntreprise: Joi.string().min(2),
    siegeEntreprise: Joi.string().min(2),
    adrEntreprise: Joi.string().min(2),
    sexeRepresentant: Joi.string(),
    nomRepresentant: Joi.string().min(2),
    prenomRepresentant: Joi.string().min(2),
    emailRepresentant: Joi.string().email(),
    telephoneRepresentant: Joi.string().regex(/^\+(?:[0-9]●?){6,14}[0-9]$/),
    qualiteRepresentant: Joi.string().min(2)
};

export const moreSchema = {
    complementaires: Joi.string().optional()
}

export const recapSchema = {
    complementaires: Joi.string().min(2)
}