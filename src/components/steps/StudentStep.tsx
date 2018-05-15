// import * as Joi from 'joi';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
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
                    </div>
                </div>
                <div className="fukol-parent">
                    <div className="fukol-child">
                        <TextField
                            id="nom"
                            label="Nom"
                            className="input-text"
                            onChange={this.onChange}
                            margin="normal"
                        />
                        <TextField 
                            label="Prénom"
                            id="prenom"
                            className="input-text"
                            onChange={this.onChange}
                        />
                    </div>
                </div>
                <div className="fukol-parent">
                    <div className="fukol-child">
                        <TextField 
                            label="Numéro de SS"
                            className="input-text"
                        />
                        <TextField 
                            label="Numéro étudiant"
                            className="input-text"
                        />
                        <TextField
                            label="Email"
                            className="input-text" 
                        />
                    </div>
                </div>
                <div className="fukol-parent">
                    <div className="fukol-child">
                        <TextField
                            className="input-date"
                            id="datetime-local"
                            label="Date de naissance"
                            type="datetime-local"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField 
                            label="Téléphone"
                            className="input-text"
                        />
                    </div>
                </div>
                <div className="fukol-parent">
                    <div className="fukol-child">
                        <TextField 
                            label="Adresse"
                            className="input-text"
                        />
                    </div>
                </div>
            </div>
        )
    }

    private async onChange(event: any) {
        const target = event.target;
        /*let schema = {} as Joi.SchemaLike;
        const object = {};
        let errorText = "";
        switch (target.id) {
            case "nom":
                object[target.id] = target.value;
                errorText = "Vous devez fournir un nom valide";
                schema = Joi.object().keys({[target.id]: Joi.string().email().required()});
                break;
            default:
        }*/

        /*const promise = new Promise((resolve, reject) => {
            const valid:any = Joi.validate(object, schema, (err: any, value: any) => {
                this.setState({errors:{[target.id]: errorText}});
                return reject(false);
            });
        });*/
        
        this.setState({errors:{[target.id]: ""}});
    }
}