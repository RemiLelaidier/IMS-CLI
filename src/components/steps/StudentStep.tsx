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
                            id="nom"
                            onChange={this._handleChange}
                        />
                    </FormControl>
                    <FormControl required={true} error={this.state.errors.prenom}>
                        <InputLabel htmlFor="prenom">Prénom</InputLabel>
                        <Input
                            id="prenom"
                            onChange={this._handleChange}
                        />
                    </FormControl>
                </FormGroup>
                <FormGroup row={true}>
                    <FormControl required={true} error={this.state.errors.securiteSociale}>
                        <InputLabel htmlFor="securiteSociale">N° de Sécurité Sociale</InputLabel>
                        <Input
                            id="securiteSociale"
                            onChange={this._handleChange}
                        />
                    </FormControl>
                    <FormControl required={true} error={this.state.errors.numeroEtudiant}>
                        <InputLabel htmlFor="numeroEtudiant">N° étudiant</InputLabel>
                        <Input
                            id="numeroEtudiant"
                            onChange={this._handleChange}
                        />
                    </FormControl>
                    <FormControl required={true} error={this.state.errors.email}>
                        <InputLabel htmlFor="email">Email</InputLabel>
                        <Input
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
                            id="dateNaissance"
                            onChange={this._handleChange}
                        />
                    </FormControl>
                    <FormControl required={true} error={this.state.errors.telephone}>
                        <InputLabel htmlFor="telephone">Téléphone</InputLabel>
                        <Input
                            id="telephone"
                            onChange={this._handleChange}
                        />
                    </FormControl>
                </FormGroup>
                <FormGroup>
                    <FormControl required={true} error={this.state.errors.adresse}>
                        <InputLabel htmlFor="adresse">Adresse</InputLabel>
                        <Input
                            id="adresse"
                            onChange={this._handleChange}
                        />
                    </FormControl>
                    <p>
                        Pour votre stage, vous devez être couvert contre le risque "responsabilité civile":
                    </p>
                    <FormGroup row={true}>
                        <FormControl required={true} error={this.state.errors.assurance}>
                            <InputLabel htmlFor="assurance">Assurance</InputLabel>
                            <Input
                                id="assurance"
                                onChange={this._handleChange}
                            />
                        </FormControl>
                        <FormControl required={true} error={this.state.errors.numeroPolice}>
                            <InputLabel htmlFor="numeroPolice">Numéro de police</InputLabel>
                            <Input
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