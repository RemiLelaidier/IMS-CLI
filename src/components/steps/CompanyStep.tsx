import { MenuItem, SelectField, TextField } from 'material-ui';
import * as React from 'react';

import './Step.css';

export default class CompanyStep extends React.Component {
    public render() {
        return (
            <div>
                <h2>Entreprise</h2>
                <div className="fukol-parent">
                    <div className="fukol-child">
                        <TextField 
                            floatingLabelText="Nom"
                            className="input-text"
                        />
                        <TextField 
                            floatingLabelText="Site web"
                            className="input-text"
                        />
                    </div>
                </div>
                <div className="fukol-parent">
                    <div className="fukol-child">
                        <TextField 
                            floatingLabelText="Adresse du siège social"
                            className="input-text"
                        />
                        <TextField 
                            floatingLabelText="Adresse du stage"
                            className="input-text"
                        />
                    </div>
                </div>
                <h2>Représentant</h2>
                <div className="fukol-parent">
                    <div className="fukol-child">
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
                            floatingLabelText="Email"
                            className="input-text"
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
                            floatingLabelText="En qualité de"
                            className="input-text"
                        />
                    </div>
                </div>
            </div>
        );
    }
}