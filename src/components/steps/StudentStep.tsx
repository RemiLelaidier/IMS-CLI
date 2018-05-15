import * as Joi from 'joi';
import * as React from 'react';

import FormControl from '@material-ui/core/FormControl/FormControl';
import FormGroup from '@material-ui/core/FormGroup/FormGroup';
import FormLabel from '@material-ui/core/FormLabel/FormLabel';
import Input from '@material-ui/core/Input/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';

import './Step.css';

import { _handleField } from '../../validation/validation';

interface IStudentStepState {
    fields: any;
    errors: any;
}

interface IStudentStepProps {
    onError: (any);
}

// tslint:disable-next-line:interface-name
interface ValidatedStep {
    schema: any;
}

export default class StudentStep extends React.Component<IStudentStepProps, IStudentStepState> implements ValidatedStep{
    public schema: any;
    // tslint:disable-next-line:variable-name
    private _handleChange: any;

    constructor (props: any) {
        super(props);
        this.state = {
            fields: {
                promotion: null,
                sexe: null,
                nom: null,
                prenom: null,
                securiteSociale: null,
                numeroEtudiant: null,
                email: null,
                dateNaissance: null,
                telephone: null,
                adresse: null,
                assurance: null
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
                assurance: false
            },
        };

        this._handleChange = _handleField.bind(this);
        this.schema = {
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
        console.log(this.schema);
    }
    public render() {
        return(
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
                            <option>M</option>
                            <option>F</option>
                            <option>Autre</option>
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
                        <InputLabel htmlFor="prenom">Prenom</InputLabel>
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
                        <FormControl required={true} error={this.state.errors.assurance}>
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

    /*private _handleChange(event: any) {
        const newFields = Object.assign({}, this.state.fields);
        newFields[event.target.id] = event.target.value;
        this.setState({fields: newFields});

        const result = Joi.validate({[event.target.id]: event.target.value}, schema);
        if(result.error){
            this.setState({errors: {
                [event.target.id]: true
            }});
            this.props.onError(true);
        } else {
            this.setState({errors: {
                [event.target.id]: false
            }});

            let isEverythingFilled = true;
            for(const field in this.state.fields){
                if(this.state.fields[field] === null){
                    isEverythingFilled = false;
                }
            }

            if(isEverythingFilled){
                this.props.onError(false);
            } else {
                this.props.onError(true);
            }
        }
    }*/
}