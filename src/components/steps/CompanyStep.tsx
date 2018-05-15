import * as React from 'react';

import FormControl from '@material-ui/core/FormControl/FormControl';
import FormGroup from '@material-ui/core/FormGroup/FormGroup';
import FormLabel from '@material-ui/core/FormLabel/FormLabel';
import Input from '@material-ui/core/Input/Input';
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import Select from '@material-ui/core/Select/Select';

import { _handleField, ValidatedStep } from '../../validation/validation';
import { companySchema } from './SchemaManager';

interface CompanyProps {
    onError: (any);
    onFieldChange: (any);
}

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

export default class CompanyStep extends React.Component<CompanyProps, CompanyState> implements ValidatedStep {
    public schema: any;
    private _handleChange: any;

    constructor(props: any){
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
                sexeRepresentant: null,
                nomRepresentant: null,
                prenomRepresentant: null,
                emailRepresentant: null,
                telephoneRepresentant: null,
                qualiteRepresentant: null
            }
        }

        this._handleChange = _handleField.bind(this);
        this.schema = companySchema;
    }
    
    public render() {
        return (
            <div>
                <FormLabel component="legend">Entreprise</FormLabel>
                <FormGroup row={true}>
                    <FormControl required={true} error={this.state.errors.nomEntreprise}>
                        <InputLabel htmlFor="nomEntreprise">Nom</InputLabel>
                        <Input 
                            id="nomEntreprise"
                            onChange={this._handleChange}
                        />
                    </FormControl>
                    <FormControl required={true} error={this.state.errors.siteWebEntreprise}>
                        <InputLabel htmlFor="siteWebEntreprise">Site web</InputLabel>
                        <Input 
                            id="siteWebEntreprise"
                            onChange={this._handleChange}
                        />
                    </FormControl>
                </FormGroup>
                <FormGroup row={true}>
                    <FormControl required={true} error={this.state.errors.siegeEntreprise}>
                        <InputLabel htmlFor="siegeEntreprise">Siège social</InputLabel>
                        <Input 
                            id="siegeEntreprise"
                            onChange={this._handleChange}
                        />
                    </FormControl>
                    <FormControl required={true} error={this.state.errors.adrEntreprise}>
                        <InputLabel htmlFor="adrEntreprise">Adresse du stage</InputLabel>
                        <Input 
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
                        <InputLabel htmlFor="sexe">Sexe</InputLabel>
                        <Select
                            id="sexe"
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
                            id="nomRepresentant"
                            onChange={this._handleChange}
                        />
                    </FormControl>
                    <FormControl required={true} error={this.state.errors.prenomRepresentant}>
                        <InputLabel htmlFor="prenomRepresentant">Prénom</InputLabel>
                        <Input 
                            id="prenomRepresentant"
                            onChange={this._handleChange}
                        />
                    </FormControl>
                </FormGroup>
                <FormGroup row={true}>
                    <FormControl required={true} error={this.state.errors.emailRepresentant}>
                        <InputLabel htmlFor="emailRepresentant">Email</InputLabel>
                        <Input 
                            id="emailRepresentant"
                            onChange={this._handleChange}
                        />
                    </FormControl>
                    <FormControl required={true} error={this.state.errors.telephoneRepresentant}>
                        <InputLabel htmlFor="telephoneRepresentant">Téléphone</InputLabel>
                        <Input 
                            id="telephoneRepresentant"
                            onChange={this._handleChange}
                        />
                    </FormControl>
                    <FormControl required={true} error={this.state.errors.qualiteRepresentant}>
                        <InputLabel htmlFor="qualiteRepresentant">En qualité de</InputLabel>
                        <Input 
                            id="qualiteRepresentant"
                            onChange={this._handleChange}
                        />
                    </FormControl>
                </FormGroup>
            </div>
        );
    }

    // needed to glitch typescript checking
    // tslint:disable-next-line:member-access
    showSchema(){
        console.log(this.schema);
    }
}