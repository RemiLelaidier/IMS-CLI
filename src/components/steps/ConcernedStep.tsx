import * as Joi from 'joi';
import * as React from 'react';

import FormControl from '@material-ui/core/FormControl/FormControl';
import FormGroup from '@material-ui/core/FormGroup/FormGroup';
import FormLabel from '@material-ui/core/FormLabel/FormLabel';
import Input from '@material-ui/core/Input/Input';
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import Select from '@material-ui/core/Select/Select';

import './Step.css';

import { _handleField } from '../../validation/validation';

interface ConcernedProps {
    onError: (any);
}

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
        sexeEncadrant: string,
        nomEncadrant: string,
        prenomEncadrant: string,
        emailEncadrant: string,
        telephoneEncadrant: string,
        qualiteEncadrant: string,
        sexeTuteur: string,
        nomTuteur: string,
        prenomTuteur: string,
        emailTuteur: string,
        telephoneTuteur: string,
        qualiteTuteur: string
    }
}

export default class ConcernedStep extends React.Component<ConcernedProps, ConcernedState> {
    public schema: any;
    private _handleChange: any;

    constructor(props: any){
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
                sexeEncadrant: '',
                nomEncadrant: '',
                prenomEncadrant: '',
                emailEncadrant: '',
                telephoneEncadrant: '',
                qualiteEncadrant: '',
                sexeTuteur: '',
                nomTuteur: '',
                prenomTuteur: '',
                emailTuteur: '',
                telephoneTuteur: '',
                qualiteTuteur: ''
            }
        }

        this._handleChange = _handleField.bind(this);
        this.schema = {
            sexeEncadrant: Joi.string().min(2),
            nomEncadrant: Joi.string().min(2),
            prenomEncadrant: Joi.string().min(2),
            emailEncadrant: Joi.string().email(),
            telephoneEncadrant: Joi.string().regex(/^\+(?:[0-9]●?){6,14}[0-9]$/),
            qualiteEncadrant: Joi.string().min(2),
            sexeTuteur: Joi.string().min(2),
            nomTuteur: Joi.string().min(2),
            prenomTuteur: Joi.string().min(2),
            emailTuteur: Joi.string().email(),
            telephoneTuteur: Joi.string().regex(/^\+(?:[0-9]●?){6,14}[0-9]$/),
            qualiteTuteur: Joi.string().min(2)
        };
    }
    
    public render() {
        return (
            <div>
                <FormLabel component="legend">Encadreur dans l'entreprise</FormLabel>
                <br />
                <FormGroup row={true}>
                    <FormControl required={true} error={this.state.errors.sexeEncadrant}>
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

                    <FormControl required={true} error={this.state.errors.nomEncadrant}>
                        <InputLabel htmlFor="nomEncadrant">Nom</InputLabel>
                        <Input 
                            id="nomEncadrant"
                            onChange={this._handleChange}
                        />
                    </FormControl>
                    <FormControl required={true} error={this.state.errors.prenomEncadrant}>
                        <InputLabel htmlFor="prenomEncadrant">Prénom</InputLabel>
                        <Input 
                            id="prenomEncadrant"
                            onChange={this._handleChange}
                        />
                    </FormControl>
                </FormGroup>
                <FormGroup row={true}>
                    <FormControl required={true} error={this.state.errors.emailEncadrant}>
                        <InputLabel htmlFor="emailEncadrant">Email</InputLabel>
                        <Input 
                            id="emailEncadrant"
                            onChange={this._handleChange}
                        />
                    </FormControl>
                    <FormControl required={true} error={this.state.errors.telephoneEncadrant}>
                        <InputLabel htmlFor="telephoneEncadrant">Téléphone</InputLabel>
                        <Input 
                            id="telephoneEncadrant"
                            onChange={this._handleChange}
                        />
                    </FormControl>
                    <FormControl required={true} error={this.state.errors.qualiteEncadrant}>
                        <InputLabel htmlFor="qualiteEncadrant">En qualité de</InputLabel>
                        <Input 
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

                    <FormControl required={true} error={this.state.errors.nomTuteur}>
                        <InputLabel htmlFor="nomTuteur">Nom</InputLabel>
                        <Input 
                            id="nomTuteur"
                            onChange={this._handleChange}
                        />
                    </FormControl>
                    <FormControl required={true} error={this.state.errors.prenomTuteur}>
                        <InputLabel htmlFor="prenomTuteur">Prénom</InputLabel>
                        <Input 
                            id="prenomTuteur"
                            onChange={this._handleChange}
                        />
                    </FormControl>
                </FormGroup>
                <FormGroup row={true}>
                    <FormControl required={true} error={this.state.errors.emailTuteur}>
                        <InputLabel htmlFor="emailTuteur">Email</InputLabel>
                        <Input 
                            id="emailTuteur"
                            onChange={this._handleChange}
                        />
                    </FormControl>
                    <FormControl required={true} error={this.state.errors.telephoneTuteur}>
                        <InputLabel htmlFor="telephoneTuteur">Téléphone</InputLabel>
                        <Input 
                            id="telephoneTuteur"
                            onChange={this._handleChange}
                        />
                    </FormControl>
                    <FormControl required={true} error={this.state.errors.qualiteTuteur}>
                        <InputLabel htmlFor="qualiteTuteur">En qualité de</InputLabel>
                        <Input 
                            id="qualiteTuteur"
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