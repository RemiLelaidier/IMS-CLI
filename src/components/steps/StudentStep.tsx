import * as React from 'react';

import FormControl from '@material-ui/core/FormControl/FormControl';
import FormGroup from '@material-ui/core/FormGroup/FormGroup';
import FormLabel from '@material-ui/core/FormLabel/FormLabel';
import Input from '@material-ui/core/Input/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';

import { _handleField, ValidatedStep } from '../../validation/validation';
import { FormProps } from '../pages/StudentPage';
import { studentSchema } from './SchemaManager';

interface StudentState {
    fields: any;
    errors: any;
}

export default class StudentStep extends React.Component<FormProps, StudentState> implements ValidatedStep {
    public schema: any;
    private _handleChange: any;

    constructor(props: FormProps) {
        super(props);

        this.state = {
            fields: {
                promotion: 'L3',
                sexe: 'M',
                nom: null,
                prenom: null,
                securiteSociale: null,
                numeroEtudiant: null,
                email: null,
                dateNaissance: null,
                telephone: null,
                adresse: null,
                assurance: null,
                numeroPolice: null
            },
            errors: {
                promotion: false,
                sexe: false,
                nom: false,
                prenom: false,
                securiteSociale: false,
                numeroEtudiant: false,
                email: false,
                dateNaissance: false,
                telephone: false,
                adresse: false,
                assurance: false,
                numeroPolice: false
            },
        };

        this._handleChange = _handleField.bind(this);
        this.schema = studentSchema;

        let hasPromotionValue: boolean = false;
        let hasSexeValue: boolean = false;

        const lastFields: any = this.props.getLastFields();
        if (Object.keys(lastFields).length > 0) {
            if (lastFields.promotion != null) {
                this.state.fields.promotion = lastFields.promotion;
                hasPromotionValue = true;
            }
            if (lastFields.sexe != null) {
                this.state.fields.sexe = lastFields.sexe;
                hasSexeValue = true;
            }
            if (lastFields.nom != null) {
                this.state.fields.nom = lastFields.nom;
            }
            if (lastFields.prenom != null) {
                this.state.fields.prenom = lastFields.prenom;
            }
            if (lastFields.securiteSociale != null) {
                this.state.fields.securiteSociale = lastFields.securiteSociale;
            }
            if (lastFields.numeroEtudiant != null) {
                this.state.fields.numeroEtudiant = lastFields.numeroEtudiant;
            }
            if (lastFields.email != null) {
                this.state.fields.email = lastFields.email;
            }
            if (lastFields.dateNaissance != null) {
                this.state.fields.dateNaissance = lastFields.dateNaissance;
            }
            if (lastFields.telephone != null) {
                this.state.fields.telephone = lastFields.telephone;
            }
            if (lastFields.adresse != null) {
                this.state.fields.adresse = lastFields.adresse;
            }
            if (lastFields.assurance != null) {
                this.state.fields.assurance = lastFields.assurance;
            }
            if (lastFields.numeroPolice != null) {
                this.state.fields.numeroPolice = lastFields.numeroPolice;
            }

            if (lastFields.promotion && lastFields.sexe && lastFields.prenom && lastFields.securiteSociale && lastFields.numeroEtudiant && lastFields.email
                && lastFields.dateNaissance && lastFields.telephone && lastFields.adresse && lastFields.assurance && lastFields.numeroPolice) {
                // force validation, we consider it's "onError = false" because already checked when submitted (we're in previous situation)
                this.props.onError(false);
            }
        }

        if (!hasPromotionValue) {
            this.props.defaultField('promotion', 'L3', this.constructor.name);
        }
        
        if (!hasSexeValue) {
            this.props.defaultField('sexe', 'M', this.constructor.name);
        }
    }

    public render() {
        return (
            <div>
                <FormLabel component="legend">Étudiant</FormLabel>
                <br />
                <FormGroup row={true}>
                    <FormControl required={true} error={this.state.errors.promotion}>
                        <InputLabel htmlFor="promotion">Promotion</InputLabel>
                        <Select
                            value={this.state.fields.promotion ? this.state.fields.promotion : undefined}
                            inputProps={{
                                id: 'promotion',
                                name: "Promotion"
                            }}
                            onChange={this._handleChange}
                            native={true}
                        >
                            <option value="L3">Licence 3</option>
                            <option value="M1">Master 1</option>
                            <option value="M2">Master 2</option>
                        </Select>
                    </FormControl>
                    <FormControl required={true} error={this.state.errors.sexe}>
                        <InputLabel htmlFor="sexe">Sexe</InputLabel>
                        <Select
                            value={this.state.fields.sexe ? this.state.fields.sexe : undefined}
                            native={true}
                            onChange={this._handleChange}
                            inputProps={{
                                id: 'sexe',
                                name: "Sexe"
                            }}
                        >
                            <option value='M'>M</option>
                            <option value='F'>F</option>
                            <option value='A'>Autre</option>
                        </Select>
                    </FormControl>
                </FormGroup>
                <FormGroup row={true}>
                    <FormControl required={true} error={this.state.errors.nom}>
                        <InputLabel htmlFor="nom">Nom</InputLabel>
                        <Input
                            value={this.state.fields.nom ? this.state.fields.nom : ""}
                            id="nom"
                            onChange={this._handleChange}
                        />
                    </FormControl>
                    <FormControl required={true} error={this.state.errors.prenom}>
                        <InputLabel htmlFor="prenom">Prénom</InputLabel>
                        <Input
                            value={this.state.fields.prenom ? this.state.fields.prenom : ""}
                            id="prenom"
                            onChange={this._handleChange}
                        />
                    </FormControl>
                </FormGroup>
                <FormGroup row={true}>
                    <FormControl required={true} error={this.state.errors.securiteSociale}>
                        <InputLabel htmlFor="securiteSociale">N° de Sécurité Sociale</InputLabel>
                        <Input
                            value={this.state.fields.securiteSociale ? this.state.fields.securiteSociale : ""}
                            id="securiteSociale"
                            onChange={this._handleChange}
                        />
                    </FormControl>
                    <FormControl required={true} error={this.state.errors.numeroEtudiant}>
                        <InputLabel htmlFor="numeroEtudiant">N° étudiant</InputLabel>
                        <Input
                            value={this.state.fields.numeroEtudiant ? this.state.fields.numeroEtudiant : ""}
                            id="numeroEtudiant"
                            onChange={this._handleChange}
                        />
                    </FormControl>
                    <FormControl required={true} error={this.state.errors.email}>
                        <InputLabel htmlFor="email">Email</InputLabel>
                        <Input
                            value={this.state.fields.email ? this.state.fields.email : ""}
                            id="email"
                            onChange={this._handleChange}
                        />
                    </FormControl>
                </FormGroup>
                <br />
                <FormGroup row={true}>
                    <FormControl required={true} error={this.state.errors.dateNaissance}>
                        <InputLabel htmlFor="dateNaissance">Date de naissance</InputLabel>
                        <Input
                            value={this.state.fields.dateNaissance ? this.state.fields.dateNaissance : ""}
                            id="dateNaissance"
                            onChange={this._handleChange}
                            placeholder="20/03/1993"
                        />
                    </FormControl>
                    <FormControl required={true} error={this.state.errors.telephone}>
                        <InputLabel htmlFor="telephone">Téléphone</InputLabel>
                        <Input
                            value={this.state.fields.telephone ? this.state.fields.telephone : ""}
                            id="telephone"
                            onChange={this._handleChange}
                            placeholder="+33611223344"
                        />
                    </FormControl>
                </FormGroup>
                <FormGroup>
                    <FormControl required={true} error={this.state.errors.adresse}>
                        <InputLabel htmlFor="adresse">Adresse</InputLabel>
                        <Input
                            value={this.state.fields.adresse ? this.state.fields.adresse : ""}
                            id="adresse"
                            onChange={this._handleChange}
                        />
                    </FormControl>
                    <p>
                        Pour votre stage, vous devez être couvert contre le risque "responsabilité civile" :
                    </p>
                    <FormGroup row={true}>
                        <FormControl required={true} error={this.state.errors.assurance}>
                            <InputLabel htmlFor="assurance">Assurance</InputLabel>
                            <Input
                                value={this.state.fields.assurance ? this.state.fields.assurance : ""}
                                id="assurance"
                                onChange={this._handleChange}
                            />
                        </FormControl>
                        <FormControl required={true} error={this.state.errors.numeroPolice}>
                            <InputLabel htmlFor="numeroPolice">Numéro de police</InputLabel>
                            <Input
                                value={this.state.fields.numeroPolice ? this.state.fields.numeroPolice : ""}
                                id="numeroPolice"
                                onChange={this._handleChange}
                            />
                        </FormControl>
                    </FormGroup>
                </FormGroup>
            </div>
        )
    }
}