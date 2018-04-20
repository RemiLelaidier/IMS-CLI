import * as Joi from 'joi';
import { DatePicker, MenuItem, SelectField, TextField } from 'material-ui';
import * as React from 'react';

import './Step.css';

interface IStudentStepState {
    data: {
        nom: string,
        prenom: string
    },
    errors: {
        nom?: string,
        prenom?: string
    }
}

export default class StudentStep extends React.Component<{}, IStudentStepState> {
    constructor (props: any) {
        super(props);
        this.state = {
            data: {
                nom: "",
                prenom: ""
            },
            errors: {}
        }

        this.onChange = this.onChange.bind(this);
    }
    public render() {
        return(
            <div>
                <div className="fukol-parent">
                    <div className="fukol-child">
                        <SelectField
                            floatingLabelText="Promotion"
                            className="input-text"
                            id="promo"
                        >
                            <MenuItem>Licence 3</MenuItem>
                            <MenuItem>Master 1</MenuItem>
                            <MenuItem>Master 2</MenuItem>
                        </SelectField>
                        <SelectField
                            floatingLabelText="Sexe"
                            className="input-text"
                            id="sexe"
                        >
                            <MenuItem>M</MenuItem>
                            <MenuItem>F</MenuItem>
                            <MenuItem>Autre</MenuItem>
                        </SelectField>
                    </div>
                </div>
                <div className="fukol-parent">
                    <div className="fukol-child">
                        <TextField 
                            floatingLabelText="Nom"
                            className="input-text"
                            id="nom"
                            onChange={this.onChange}
                            errorText={this.state.errors.nom}
                        />
                        <TextField 
                            floatingLabelText="Prénom"
                            id="prenom"
                            className="input-text"
                            onChange={this.onChange}
                            errorText={this.state.errors.prenom}
                        />
                    </div>
                </div>
                <div className="fukol-parent">
                    <div className="fukol-child">
                        <TextField 
                            floatingLabelText="Numéro de SS"
                            className="input-text"
                        />
                        <TextField 
                            floatingLabelText="Numéro étudiant"
                            className="input-text"
                        />
                        <TextField
                            floatingLabelText="Email"
                            className="input-text" 
                        />
                    </div>
                </div>
                <div className="fukol-parent">
                    <div className="fukol-child">
                        <DatePicker
                            floatingLabelText="Date de naissance"
                            className="input-date"
                        />
                        <TextField 
                            floatingLabelText="Téléphone"
                            className="input-text"
                        />
                    </div>
                </div>
                <div className="fukol-parent">
                    <div className="fukol-child">
                        <TextField 
                            floatingLabelText="Adresse"
                            className="input-text"
                        />
                    </div>
                </div>
            </div>
        )
    }

    private async onChange(event: any) {
        const target = event.target;
        let schema = {} as Joi.SchemaLike;
        const object = {};
        let errorText = "";
        switch (target.id) {
            case "nom":
                object[target.id] = target.value;
                errorText = "Vous devez fournir un nom valide";
                schema = Joi.object().keys({[target.id]: Joi.string().email().required()});
                break;
            default:
        }

        const promise = new Promise((resolve, reject) => {
            const valid:any = Joi.validate(object, schema, (err: any, value: any) => {
                this.setState({errors:{[target.id]: errorText}});
                return reject(false);
            });
        });
        
        this.setState({errors:{[target.id]: ""}});
    }
}