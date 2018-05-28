import * as React from 'react';

import FormControl from '@material-ui/core/FormControl/FormControl';
import FormGroup from '@material-ui/core/FormGroup/FormGroup';
import FormLabel from '@material-ui/core/FormLabel/FormLabel';
import Input from '@material-ui/core/Input/Input';
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import Select from '@material-ui/core/Select/Select';

import { _handleField, ValidatedStep } from '../../validation/validation';
import { FormProps } from '../pages/StudentPage';
import { concernedSchema } from './SchemaManager';

interface ConcernedState {
    errors: {
        sexeEncadrant: boolean,
        nomEncadrant: boolean,
        prenomEncadrant: boolean,
        emailEncadrant: boolean,
        telephoneEncadrant: boolean,
        qualiteEncadrant: boolean,
        sexeTuteur: boolean,
        nomTuteur: boolean,
        prenomTuteur: boolean,
        emailTuteur: boolean,
        telephoneTuteur: boolean,
        qualiteTuteur: boolean
    },
    fields: {
        sexeEncadrant: string | null,
        nomEncadrant: string | null,
        prenomEncadrant: string | null,
        emailEncadrant: string | null,
        telephoneEncadrant: string | null,
        qualiteEncadrant: string | null,
        sexeTuteur: string | null,
        nomTuteur: string | null,
        prenomTuteur: string | null,
        emailTuteur: string | null,
        telephoneTuteur: string | null,
        qualiteTuteur: string | null
    }
}

export default class ConcernedStep extends React.Component<FormProps, ConcernedState> implements ValidatedStep {
    public schema: any;
    private _handleChange: any;

    constructor(props: FormProps) {
        super(props);
        this.state = {
            errors: {
                sexeEncadrant: false,
                nomEncadrant: false,
                prenomEncadrant: false,
                emailEncadrant: false,
                telephoneEncadrant: false,
                qualiteEncadrant: false,
                sexeTuteur: false,
                nomTuteur: false,
                prenomTuteur: false,
                emailTuteur: false,
                telephoneTuteur: false,
                qualiteTuteur: false
            },
            fields: {
                sexeEncadrant: 'M',
                nomEncadrant: null,
                prenomEncadrant: null,
                emailEncadrant: null,
                telephoneEncadrant: null,
                qualiteEncadrant: null,
                sexeTuteur: 'M',
                nomTuteur: null,
                prenomTuteur: null,
                emailTuteur: null,
                telephoneTuteur: null,
                qualiteTuteur: null
            }
        }

        this._handleChange = _handleField.bind(this);
        this.schema = concernedSchema;

        let hasSexeEncadrant: boolean = false;
        let hasSexeTuteur: boolean = false;

        const lastFields: any = this.props.getLastFields();
        if (Object.keys(lastFields).length > 0) {
            if (lastFields.sexeEncadrant != null) {
                this.state.fields.sexeEncadrant = lastFields.sexeEncadrant;
                hasSexeEncadrant = true;
            }
            if (lastFields.nomEncadrant != null) {
                this.state.fields.nomEncadrant = lastFields.nomEncadrant;
            }
            if (lastFields.prenomEncadrant != null) {
                this.state.fields.prenomEncadrant = lastFields.prenomEncadrant;
            }
            if (lastFields.emailEncadrant != null) {
                this.state.fields.emailEncadrant = lastFields.emailEncadrant;
            }
            if (lastFields.telephoneEncadrant != null) {
                this.state.fields.telephoneEncadrant = lastFields.telephoneEncadrant;
            }
            if (lastFields.qualiteEncadrant != null) {
                this.state.fields.qualiteEncadrant = lastFields.qualiteEncadrant;
            }
            if (lastFields.sexeTuteur != null) {
                this.state.fields.sexeTuteur = lastFields.sexeTuteur;
                hasSexeTuteur = true;
            }
            if (lastFields.nomTuteur != null) {
                this.state.fields.nomTuteur = lastFields.nomTuteur;
            }
            if (lastFields.prenomTuteur != null) {
                this.state.fields.prenomTuteur = lastFields.prenomTuteur;
            }
            if (lastFields.emailTuteur != null) {
                this.state.fields.emailTuteur = lastFields.emailTuteur;
            }
            if (lastFields.telephoneTuteur != null) {
                this.state.fields.telephoneTuteur = lastFields.telephoneTuteur;
            }
            if (lastFields.qualiteTuteur != null) {
                this.state.fields.qualiteTuteur = lastFields.qualiteTuteur;
            }

            if (lastFields.sexeEncadrant && lastFields.nomEncadrant && lastFields.prenomEncadrant && lastFields.emailEncadrant
                && lastFields.telephoneEncadrant && lastFields.qualiteEncadrant && lastFields.sexeTuteur && lastFields.nomTuteur
                && lastFields.prenomTuteur && lastFields.emailTuteur && lastFields.telephoneTuteur && lastFields.qualiteTuteur) {
                // force validation, we consider it's "onError = false" because already checked when submitted (we're in previous situation)
                this.props.onError(false);
            }
        }

        if (!hasSexeEncadrant) {
            this.props.defaultField('sexeEncadrant', 'M', this.constructor.name);
        }

        if (!hasSexeTuteur) {
            this.props.defaultField('sexeTuteur', 'M', this.constructor.name);
        }
    }

    public render() {
        return (
            <div>
                <FormLabel component="legend">Encadrant dans l'entreprise</FormLabel>
                <br />
                <FormGroup row={true}>
                    <FormControl required={true} error={this.state.errors.sexeEncadrant}>
                        <InputLabel htmlFor="sexeEncadrant">Sexe</InputLabel>
                        <Select
                            value={this.state.fields.sexeEncadrant ? this.state.fields.sexeEncadrant : undefined}
                            id="sexeEncadrant"
                            native={true}
                            onChange={this._handleChange}
                        >
                            <option value='M'>M</option>
                            <option value='F'>F</option>
                            <option value='A'>Autre</option>
                        </Select>
                    </FormControl>

                    <FormControl required={true} error={this.state.errors.nomEncadrant}>
                        <InputLabel htmlFor="nomEncadrant">Nom</InputLabel>
                        <Input
                            value={this.state.fields.nomEncadrant ? this.state.fields.nomEncadrant : ""}
                            id="nomEncadrant"
                            onChange={this._handleChange}
                        />
                    </FormControl>
                    <FormControl required={true} error={this.state.errors.prenomEncadrant}>
                        <InputLabel htmlFor="prenomEncadrant">Prénom</InputLabel>
                        <Input
                            value={this.state.fields.prenomEncadrant ? this.state.fields.prenomEncadrant : ""}
                            id="prenomEncadrant"
                            onChange={this._handleChange}
                        />
                    </FormControl>
                </FormGroup>
                <FormGroup row={true}>
                    <FormControl required={true} error={this.state.errors.emailEncadrant}>
                        <InputLabel htmlFor="emailEncadrant">Email</InputLabel>
                        <Input
                            value={this.state.fields.emailEncadrant ? this.state.fields.emailEncadrant : ""}
                            id="emailEncadrant"
                            onChange={this._handleChange}
                        />
                    </FormControl>
                    <FormControl required={true} error={this.state.errors.telephoneEncadrant}>
                        <InputLabel htmlFor="telephoneEncadrant">Téléphone</InputLabel>
                        <Input
                            value={this.state.fields.telephoneEncadrant ? this.state.fields.telephoneEncadrant : ""}
                            id="telephoneEncadrant"
                            onChange={this._handleChange}
                            placeholder="+33611223344"
                        />
                    </FormControl>
                    <FormControl required={true} error={this.state.errors.qualiteEncadrant}>
                        <InputLabel htmlFor="qualiteEncadrant">En qualité de</InputLabel>
                        <Input
                            value={this.state.fields.qualiteEncadrant ? this.state.fields.qualiteEncadrant : ""}
                            id="qualiteEncadrant"
                            onChange={this._handleChange}
                        />
                    </FormControl>
                </FormGroup>
                <br />
                <FormLabel component="legend">Tuteur enseignant</FormLabel>
                <br />
                <FormGroup row={true}>
                    <FormControl required={true} error={this.state.errors.sexeTuteur}>
                        <InputLabel htmlFor="sexeTuteur">Sexe</InputLabel>
                        <Select
                            value={this.state.fields.sexeTuteur ? this.state.fields.sexeTuteur : undefined}
                            id="sexeTuteur"
                            native={true}
                            onChange={this._handleChange}
                        >
                            <option value='M'>M</option>
                            <option value='F'>F</option>
                            <option value='A'>Autre</option>
                        </Select>
                    </FormControl>

                    <FormControl required={true} error={this.state.errors.nomTuteur}>
                        <InputLabel htmlFor="nomTuteur">Nom</InputLabel>
                        <Input
                            value={this.state.fields.nomTuteur ? this.state.fields.nomTuteur : ""}
                            id="nomTuteur"
                            onChange={this._handleChange}
                        />
                    </FormControl>
                    <FormControl required={true} error={this.state.errors.prenomTuteur}>
                        <InputLabel htmlFor="prenomTuteur">Prénom</InputLabel>
                        <Input
                            value={this.state.fields.prenomTuteur ? this.state.fields.prenomTuteur : ""}
                            id="prenomTuteur"
                            onChange={this._handleChange}
                        />
                    </FormControl>
                </FormGroup>
                <FormGroup row={true}>
                    <FormControl required={true} error={this.state.errors.emailTuteur}>
                        <InputLabel htmlFor="emailTuteur">Email</InputLabel>
                        <Input
                            value={this.state.fields.emailTuteur ? this.state.fields.emailTuteur : ""}
                            id="emailTuteur"
                            onChange={this._handleChange}
                        />
                    </FormControl>
                    <FormControl required={true} error={this.state.errors.telephoneTuteur}>
                        <InputLabel htmlFor="telephoneTuteur">Téléphone</InputLabel>
                        <Input
                            value={this.state.fields.telephoneTuteur ? this.state.fields.telephoneTuteur : ""}
                            id="telephoneTuteur"
                            onChange={this._handleChange}
                            placeholder="+33611223344"
                        />
                    </FormControl>
                    <FormControl required={true} error={this.state.errors.qualiteTuteur}>
                        <InputLabel htmlFor="qualiteTuteur">En qualité de</InputLabel>
                        <Input
                            value={this.state.fields.qualiteTuteur ? this.state.fields.qualiteTuteur : ""}
                            id="qualiteTuteur"
                            onChange={this._handleChange}
                        />
                    </FormControl>
                </FormGroup>
            </div>
        );
    }
}