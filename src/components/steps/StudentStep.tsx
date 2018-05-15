import * as Joi from 'joi';
import * as React from 'react';

import FormControl from '@material-ui/core/FormControl/FormControl';
import FormGroup from '@material-ui/core/FormGroup/FormGroup';
import FormLabel from '@material-ui/core/FormLabel/FormLabel';
import Input from '@material-ui/core/Input/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';

import './Step.css';

interface IStudentStepState {
    showErrors: boolean;
    validationErrors: any;
    fields: any;
    errors: any;
}

const schema = {
    nom: Joi.string().min(3).max(30),
    prenom: Joi.string().min(3).max(60),
    securiteSociale: Joi.string().min(13).max(15),
    numeroEtudiant: Joi.string().regex(/[0-9]{8}/),
    email: Joi.string().email(),
    dateNaissance: Joi.string().regex(/^(0?[1-9]|[12][0-9]|3[01])[\/](0?[1-9]|1[012])[\/\-]\d{4}$/),
    telephone: Joi.string().regex(/^(0?[1-9]|[12][0-9]|3[01])[\/](0?[1-9]|1[012])[\/\-]\d{4}$/),
    adresse: Joi.string().min(5),
};

export default class StudentStep extends React.Component<{}, IStudentStepState> {
    constructor (props: any) {
        super(props);
        this.state = {
            fields: {
                promotion: '',
                sexe: '',
                nom: '',
                prenom: '',
                securiteSociale: '',
                numeroEtudiant: '',
                email: '',
                dateNaissance: '',
                telephone: '',
                adresse: '',
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
            },
            showErrors: false,
            validationErrors: {},
        };

        this._handleChange = this._handleChange.bind(this);
    }
    public render() {
        return(
            <div>
                <FormLabel component="legend">Étudiant</FormLabel>
                <br />
                <FormGroup row={true}>
                    <FormControl required={true} className="promotion" error={this.state.errors.promotion}>
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
                    <FormControl required={true} className="sexe" error={this.state.errors.sexe}>
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
                    <FormControl required={true} className="nom" error={this.state.errors.nom}>
                        <InputLabel htmlFor="nom">Nom</InputLabel>
                        <Input
                            id="nom"
                            onChange={this._handleChange}
                        />
                    </FormControl>
                    <FormControl required={true} className="prenom" error={this.state.errors.prenom}>
                        <TextField 
                            label="Prénom"
                            id="prenom"
                            onChange={this._handleChange}
                        />
                    </FormControl>
                </FormGroup>
                <FormGroup row={true}>
                    <FormControl required={true} className="securiteSociale" error={this.state.errors.securiteSociale}>
                        <TextField 
                            id="securiteSociale"
                            label="N° de Sécurité Sociale"
                            onChange={this._handleChange}
                        />
                    </FormControl>
                    <FormControl required={true} className="numeroEtudiant" error={this.state.errors.numeroEtudiant}>
                        <TextField 
                            id="numeroEtudiant"
                            label="N° étudiant"
                            onChange={this._handleChange}
                        />
                    </FormControl>
                    <FormControl required={true} className="email" error={this.state.errors.email}>
                        <TextField
                            id="email"
                            label="Email" 
                            onChange={this._handleChange}
                        />
                    </FormControl>
                </FormGroup>
                <br />
                <FormGroup row={true}>
                    <FormControl required={true} className="dateNaissance" error={this.state.errors.dateNaissance}>
                        <TextField
                            className="input-date"
                            id="dateNaissance"
                            label="Date de naissance"
                            type="date"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={this._handleChange}
                        />
                    </FormControl>
                    <FormControl required={true} className="telephone" error={this.state.errors.telephone}>
                        <TextField 
                            id="telephone"
                            label="Téléphone"
                            onChange={this._handleChange}
                        />
                    </FormControl>
                </FormGroup>
                <FormGroup>
                    <FormControl required={true} error={this.state.errors.adresse}>
                        <TextField 
                            id="adresse"
                            label="Adresse"
                            onChange={this._handleChange}
                        />
                    </FormControl>
                </FormGroup>
            </div>
        )
    }

    private _handleChange(event: any) {
        this.setState({[event.target.id]: event.target.value});
        const result = Joi.validate({[event.target.id]: event.target.value}, schema);
        if(result.error){
            this.setState({errors: {
                [event.target.id]: true
            }});
        } else {
            this.setState({errors: {
                [event.target.id]: false
            }});
        }
        console.log(result);
    }
}