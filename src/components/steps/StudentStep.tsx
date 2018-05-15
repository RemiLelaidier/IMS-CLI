// import * as Joi from 'joi';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import * as React from 'react';

import FormControl from '@material-ui/core/FormControl/FormControl';
import FormGroup from '@material-ui/core/FormGroup/FormGroup';
import InputLabel from '@material-ui/core/InputLabel';
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
                            onChange={this.onChange}
                        />
                    </FormControl>
                    <FormControl>
                        <TextField 
                            label="Prénom"
                            id="prenom"
                            className="input-text"
                            onChange={this.onChange}
                        />
                    </FormControl>
                </FormGroup>
                <FormGroup row={true}>
                    <FormControl>
                        <TextField 
                            label="Numéro de SS"
                            className="input-text"
                        />
                    </FormControl>
                    <FormControl>
                        <TextField 
                            label="Numéro étudiant"
                            className="input-text"
                        />
                    </FormControl>
                    <FormControl>
                        <TextField
                            label="Email"
                            className="input-text" 
                        />
                    </FormControl>
                </FormGroup>
                <FormGroup row={true}>
                    <FormControl>
                        <TextField
                            className="input-date"
                            id="datetime-local"
                            label="Date de naissance"
                            type="datetime-local"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </FormControl>
                    <FormControl>
                        <TextField 
                            label="Téléphone"
                            className="input-text"
                        />
                    </FormControl>
                </FormGroup>
                <FormGroup>
                    <FormControl>
                        <TextField 
                            label="Adresse"
                            className="input-text"
                        />
                    </FormControl>
                </FormGroup>
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