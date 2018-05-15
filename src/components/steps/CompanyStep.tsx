import Select from '@material-ui/core/Select/Select';
import { Divider, TextField } from 'material-ui';
import * as React from 'react';

import './Step.css';

export default class CompanyStep extends React.Component {
    public render() {
        return (
            <div>
                <h2>Entreprise</h2>
                <Divider />
                <div className="fukol-parent">
                    <div className="fukol-child">
                        <TextField 
                            label="Nom"
                            className="input-text"
                        />
                        <TextField 
                            label="Site web"
                            className="input-text"
                        />
                    </div>
                </div>
                <div className="fukol-parent">
                    <div className="fukol-child">
                        <TextField 
                            label="Adresse du siège social"
                            className="input-text"
                        />
                        <TextField 
                            label="Adresse du stage"
                            className="input-text"
                        />
                    </div>
                </div>
                <h2>Représentant</h2>
                <Divider />
                <div className="fukol-parent">
                    <div className="fukol-child">
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
                    </div>
                </div>
                <div className="fukol-parent">
                    <div className="fukol-child">
                        <TextField 
                            label="Nom"
                            className="input-text"
                        />
                        <TextField 
                            label="Prénom"
                            className="input-text"
                        />
                    </div>
                </div>
                <div className="fukol-parent">
                    <div className="fukol-child">
                        <TextField 
                            label="Email"
                            className="input-text"
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
                            label="En qualité de"
                            className="input-text"
                        />
                    </div>
                </div>
            </div>
        );
    }
}