import { DatePicker, MenuItem, SelectField, TextField } from 'material-ui';
import * as React from 'react';

import './Step.css';

export default class StudentStep extends React.Component {

    public render() {
        return(
            <div>
                <div className="fukol-parent">
                    <div className="fukol-child">
                        <SelectField
                            floatingLabelText="Promotion"
                            className="input-text"
                        >
                            <MenuItem>Licence 3</MenuItem>
                            <MenuItem>Master 1</MenuItem>
                            <MenuItem>Master 2</MenuItem>
                        </SelectField>
                        <SelectField
                            floatingLabelText="Sexe"
                            className="input-text"
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
                        />
                        <TextField 
                            floatingLabelText="Prénom"
                            className="input-text"
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
}