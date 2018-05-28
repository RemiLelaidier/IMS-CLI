import * as React from 'react';

import FormControl from '@material-ui/core/FormControl/FormControl';
import FormGroup from '@material-ui/core/FormGroup/FormGroup';
import FormLabel from '@material-ui/core/FormLabel/FormLabel';
import Input from '@material-ui/core/Input/Input';
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import Select from '@material-ui/core/Select/Select';

import { _handleField, ValidatedStep } from '../../validation/validation';
import { FormProps } from '../pages/StudentPage';
import { companySchema } from './SchemaManager';

interface CompanyState {
    errors: {
        nomEntreprise: boolean,
        siteWebEntreprise: boolean,
        siegeEntreprise: boolean,
        adrEntreprise: boolean,
        sexeRepresentant: boolean,
        nomRepresentant: boolean,
        prenomRepresentant: boolean,
        emailRepresentant: boolean,
        telephoneRepresentant: boolean,
        qualiteRepresentant: boolean
    },
    fields: {
        nomEntreprise: string | null,
        siteWebEntreprise: string | null,
        siegeEntreprise: string | null,
        adrEntreprise: string | null,
        sexeRepresentant: string | null,
        nomRepresentant: string | null,
        prenomRepresentant: string | null,
        emailRepresentant: string | null,
        telephoneRepresentant: string | null,
        qualiteRepresentant: string | null
    }
}

export default class CompanyStep extends React.Component<FormProps, CompanyState> implements ValidatedStep {
    public schema: any;
    private _handleChange: any;

    constructor(props: FormProps) {
        super(props);
        this.state = {
            errors: {
                nomEntreprise: false,
                siteWebEntreprise: false,
                siegeEntreprise: false,
                adrEntreprise: false,
                sexeRepresentant: false,
                nomRepresentant: false,
                prenomRepresentant: false,
                emailRepresentant: false,
                telephoneRepresentant: false,
                qualiteRepresentant: false
            },
            fields: {
                nomEntreprise: null,
                siteWebEntreprise: null,
                siegeEntreprise: null,
                adrEntreprise: null,
                sexeRepresentant: 'M',
                nomRepresentant: null,
                prenomRepresentant: null,
                emailRepresentant: null,
                telephoneRepresentant: null,
                qualiteRepresentant: null
            }
        }

        this._handleChange = _handleField.bind(this);
        this.schema = companySchema;

        let hasSexeValue: boolean = false;

        const lastFields: any = this.props.getLastFields();
        if (Object.keys(lastFields).length > 0) {
            if (lastFields.nomEntreprise != null) {
                this.state.fields.nomEntreprise = lastFields.nomEntreprise;
            }
            if (lastFields.siteWebEntreprise != null) {
                this.state.fields.siteWebEntreprise = lastFields.siteWebEntreprise;
            }
            if (lastFields.siegeEntreprise != null) {
                this.state.fields.siegeEntreprise = lastFields.siegeEntreprise;
            }
            if (lastFields.adrEntreprise != null) {
                this.state.fields.adrEntreprise = lastFields.adrEntreprise;
            }
            if (lastFields.sexeRepresentant != null) {
                this.state.fields.sexeRepresentant = lastFields.sexeRepresentant;
                hasSexeValue = true;
            }
            if (lastFields.nomRepresentant != null) {
                this.state.fields.nomRepresentant = lastFields.nomRepresentant;
            }
            if (lastFields.prenomRepresentant != null) {
                this.state.fields.prenomRepresentant = lastFields.prenomRepresentant;
            }
            if (lastFields.emailRepresentant != null) {
                this.state.fields.emailRepresentant = lastFields.emailRepresentant;
            }
            if (lastFields.telephoneRepresentant != null) {
                this.state.fields.telephoneRepresentant = lastFields.telephoneRepresentant;
            }
            if (lastFields.qualiteRepresentant != null) {
                this.state.fields.qualiteRepresentant = lastFields.qualiteRepresentant;
            }

            if (lastFields.nomEntreprise && lastFields.siteWebEntreprise && lastFields.siegeEntreprise && lastFields.adrEntreprise
                && lastFields.sexeRepresentant && lastFields.nomRepresentant && lastFields.prenomRepresentant && lastFields.emailRepresentant
                && lastFields.telephoneRepresentant && lastFields.qualiteRepresentant) {
                // force validation, we consider it's "onError = false" because already checked when submitted (we're in previous situation)
                this.props.onError(false);
            }
        }

        if (!hasSexeValue) {
            this.props.defaultField('sexeRepresentant', 'M', this.constructor.name);
        }
    }

    public render() {
        return (
            <div>
                <FormLabel component="legend">Entreprise</FormLabel>
                <FormGroup row={true}>
                    <FormControl required={true} error={this.state.errors.nomEntreprise}>
                        <InputLabel htmlFor="nomEntreprise">Nom</InputLabel>
                        <Input
                            value={this.state.fields.nomEntreprise ? this.state.fields.nomEntreprise : ""}
                            id="nomEntreprise"
                            onChange={this._handleChange}
                        />
                    </FormControl>
                    <FormControl required={true} error={this.state.errors.siteWebEntreprise}>
                        <InputLabel htmlFor="siteWebEntreprise">Site web</InputLabel>
                        <Input
                            value={this.state.fields.siteWebEntreprise ? this.state.fields.siteWebEntreprise : ""}
                            id="siteWebEntreprise"
                            onChange={this._handleChange}
                        />
                    </FormControl>
                </FormGroup>
                <FormGroup row={true}>
                    <FormControl required={true} error={this.state.errors.siegeEntreprise}>
                        <InputLabel htmlFor="siegeEntreprise">Siège social</InputLabel>
                        <Input
                            value={this.state.fields.siegeEntreprise ? this.state.fields.siegeEntreprise : ""}
                            id="siegeEntreprise"
                            onChange={this._handleChange}
                        />
                    </FormControl>
                    <FormControl required={true} error={this.state.errors.adrEntreprise}>
                        <InputLabel htmlFor="adrEntreprise">Adresse du stage</InputLabel>
                        <Input
                            value={this.state.fields.adrEntreprise ? this.state.fields.adrEntreprise : ""}
                            id="adrEntreprise"
                            onChange={this._handleChange}
                        />
                    </FormControl>
                </FormGroup>
                <br /><br />
                <FormLabel component="legend">Représentant</FormLabel>
                <br />
                <FormGroup row={true}>
                    <FormControl required={true} error={this.state.errors.sexeRepresentant}>
                        <InputLabel htmlFor="sexeRepresentant">Sexe</InputLabel>
                        <Select
                            value={this.state.fields.sexeRepresentant ? this.state.fields.sexeRepresentant : undefined}
                            id="sexeRepresentant"
                            native={true}
                            onChange={this._handleChange}
                        >
                            <option value='M'>M</option>
                            <option value='F'>F</option>
                            <option value='A'>Autre</option>
                        </Select>
                    </FormControl>

                    <FormControl required={true} error={this.state.errors.nomRepresentant}>
                        <InputLabel htmlFor="nomRepresentant">Nom</InputLabel>
                        <Input
                            value={this.state.fields.nomRepresentant ? this.state.fields.nomRepresentant : ""}
                            id="nomRepresentant"
                            onChange={this._handleChange}
                        />
                    </FormControl>
                    <FormControl required={true} error={this.state.errors.prenomRepresentant}>
                        <InputLabel htmlFor="prenomRepresentant">Prénom</InputLabel>
                        <Input
                            value={this.state.fields.prenomRepresentant ? this.state.fields.prenomRepresentant : ""}
                            id="prenomRepresentant"
                            onChange={this._handleChange}
                        />
                    </FormControl>
                </FormGroup>
                <FormGroup row={true}>
                    <FormControl required={true} error={this.state.errors.emailRepresentant}>
                        <InputLabel htmlFor="emailRepresentant">Email</InputLabel>
                        <Input
                            value={this.state.fields.emailRepresentant ? this.state.fields.emailRepresentant : ""}
                            id="emailRepresentant"
                            onChange={this._handleChange}
                        />
                    </FormControl>
                    <FormControl required={true} error={this.state.errors.telephoneRepresentant}>
                        <InputLabel htmlFor="telephoneRepresentant">Téléphone</InputLabel>
                        <Input
                            value={this.state.fields.telephoneRepresentant ? this.state.fields.telephoneRepresentant : ""}
                            id="telephoneRepresentant"
                            onChange={this._handleChange}
                            placeholder="+33611223344"
                        />
                    </FormControl>
                    <FormControl required={true} error={this.state.errors.qualiteRepresentant}>
                        <InputLabel htmlFor="qualiteRepresentant">En qualité de</InputLabel>
                        <Input
                            value={this.state.fields.qualiteRepresentant ? this.state.fields.qualiteRepresentant : ""}
                            id="qualiteRepresentant"
                            onChange={this._handleChange}
                        />
                    </FormControl>
                </FormGroup>
            </div>
        );
    }
}