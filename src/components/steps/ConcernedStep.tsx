import * as React from 'react';

import FormControl from '@material-ui/core/FormControl/FormControl';
import FormGroup from '@material-ui/core/FormGroup/FormGroup';
import FormLabel from '@material-ui/core/FormLabel/FormLabel';
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import Select from '@material-ui/core/Select/Select';
import TextField from '@material-ui/core/TextField/TextField';

import './Step.css';

export default class ConcernedStep extends React.Component {
    public render() {
        return (
            <div>
                <FormLabel component="legend">Encadreur dans l'entreprise</FormLabel>
                <br />
                <FormGroup row={true}>
                    <FormControl>
                        <InputLabel htmlFor="sexe">Sexe</InputLabel>
                        <Select
                            className="input-text"
                            inputProps={{
                                id: 'sexe',
                                name: "Sexe"
                            }}
                            native={true}
                        >
                            <option>M</option>
                            <option>F</option>
                            <option>Autre</option>
                        </Select>
                    </FormControl>
                    
                    <TextField 
                            label="Nom"
                            className="input-text"
                        />
                    <TextField 
                        label="Prénom"
                        className="input-text"
                    />
                </FormGroup>
                <FormGroup row={true}>
                    <TextField 
                        label="Email"
                        className="input-text"
                    />
                    <TextField 
                        label="Téléphone"
                        className="input-text"
                    />
                    <TextField 
                        label="En qualité de"
                        className="input-text"
                    />
                </FormGroup>
                <br />
                <FormLabel component="legend">Tuteur enseignant</FormLabel>
                <br />
                <FormGroup row={true}>
                    <FormControl>
                        <InputLabel htmlFor="sexe">Sexe</InputLabel>
                        <Select
                            className="input-text"
                            inputProps={{
                                id: 'sexe',
                                name: "Sexe"
                            }}
                            native={true}
                        >
                            <option>M</option>
                            <option>F</option>
                            <option>Autre</option>
                        </Select>
                    </FormControl>
                    
                    <TextField 
                            label="Nom"
                            className="input-text"
                        />
                    <TextField 
                        label="Prénom"
                        className="input-text"
                    />
                </FormGroup>
                <FormGroup row={true}>
                    <TextField 
                        label="Email"
                        className="input-text"
                    />
                    <TextField 
                        label="Téléphone"
                        className="input-text"
                    />
                    <TextField 
                        label="En qualité de"
                        className="input-text"
                    />
                </FormGroup>
            </div>
        );
    }
}