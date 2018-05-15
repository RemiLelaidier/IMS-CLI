import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import * as Joi from 'joi';
import * as React from 'react';

import FormControl from '@material-ui/core/FormControl/FormControl';
import FormGroup from '@material-ui/core/FormGroup/FormGroup';
import FormLabel from '@material-ui/core/FormLabel/FormLabel';
import InputLabel from '@material-ui/core/InputLabel';
import './Step.css';

interface IStudentStepState {
    showErrors: boolean;
    validationErrors: any;
    fields: any;
}

const schema = Joi.object().keys({
    nom: Joi.string().min(3).max(30).required(),
    prenom: Joi.string().min(3).max(60).required(),
    securiteSociale: Joi.string().min(13).max(15).required(),
    numeroEtudiant: Joi.string().regex(/[0-9]{8}/).required(),
    email: Joi.string().email().required(),
    dateNaissance: Joi.string().regex(/^(0?[1-9]|[12][0-9]|3[01])[\/](0?[1-9]|1[012])[\/\-]\d{4}$/).required(),
    telephone: Joi.string().regex(/^(0?[1-9]|[12][0-9]|3[01])[\/](0?[1-9]|1[012])[\/\-]\d{4}$/).required(),
    adresse: Joi.string().min(5).required(),
});

export default class StudentStep extends React.Component<{}, IStudentStepState> {
    constructor (props: any) {
        super(props);
        this.state = {
            fields: {
                nom: '',
                prenom: '',
                securiteSociale: '',
                numeroEtudiant: '',
                email: '',
                dateNaissance: '',
                telephone: '',
                adresse: '',
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
                    <FormControl>
                        <InputLabel htmlFor="promotion">Promotion</InputLabel>
                        <Select
                            className="input-text"
                            inputProps={{
                                id: 'promotion',
                                name: "Promotion"
                            }}
                            native={true}
                        >
                            <option>Licence 3</option>
                            <option>Master 1</option>
                            <option>Master 2</option>
                        </Select>
                    </FormControl>
                    <FormControl>
                        <InputLabel htmlFor="sexe">Sexe</InputLabel>
                        <Select
                            native={true}
                            className="input-text"
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
                    <FormControl>
                        <TextField
                            id="nom"
                            label="Nom"
                            className="input-text"
                            onChange={this._handleChange}
                        />
                    </FormControl>
                    <FormControl>
                        <TextField 
                            label="Prénom"
                            id="prenom"
                            className="input-text"
                            onChange={this._handleChange}
                        />
                    </FormControl>
                </FormGroup>
                <FormGroup row={true}>
                    <FormControl>
                        <TextField 
                            id="securiteSociale"
                            label="Numéro de SS"
                            className="input-text"
                            onChange={this._handleChange}
                        />
                    </FormControl>
                    <FormControl>
                        <TextField 
                            id="numeroEtudiant"
                            label="Numéro étudiant"
                            className="input-text"
                            onChange={this._handleChange}
                        />
                    </FormControl>
                    <FormControl>
                        <TextField
                            id="email"
                            label="Email"
                            className="input-text" 
                            onChange={this._handleChange}
                        />
                    </FormControl>
                </FormGroup>
                <br />
                <FormGroup row={true}>
                    <FormControl>
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
                    <FormControl>
                        <TextField 
                            id="telephone"
                            label="Téléphone"
                            className="input-text"
                            onChange={this._handleChange}
                        />
                    </FormControl>
                </FormGroup>
                <FormGroup>
                    <FormControl>
                        <TextField 
                            id="adresse"
                            label="Adresse"
                            className="input-text"
                            onChange={this._handleChange}
                        />
                    </FormControl>
                </FormGroup>
            </div>
        )
    }

    private _handleChange(event: any) {
        this.setState({[event.target.id]: event.target.value});
        const result = Joi.validate(this.state, schema);
        console.log(result);
    }
}