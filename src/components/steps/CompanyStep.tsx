import FormControl from '@material-ui/core/FormControl/FormControl';
import Select from '@material-ui/core/Select/Select';
import { TextField } from 'material-ui';
import * as React from 'react';

import FormGroup from '@material-ui/core/FormGroup/FormGroup';
import FormLabel from '@material-ui/core/FormLabel/FormLabel';
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import './Step.css';

export default class CompanyStep extends React.Component {
    public render() {
        return (
            <div>
                <FormLabel component="legend">Entreprise</FormLabel>
                <FormGroup row={true}>
                    <TextField 
                            label="Nom"
                            className="input-text"
                    />
                    <TextField 
                            label="Site web"
                            className="input-text"
                    />
                </FormGroup>
                <FormGroup row={true}>
                    <TextField 
                        label="Siège social"
                        className="input-text"
                    />

                    <TextField 
                            label="Adresse du stage"
                            className="input-text"
                    />

                </FormGroup>
                <br />
                <FormLabel component="legend">Représentant</FormLabel>
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