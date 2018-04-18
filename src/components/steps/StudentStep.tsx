import { DatePicker, MenuItem, SelectField, TextField } from 'material-ui';
import * as React from 'react';

export default class StudentStep extends React.Component {

    public render() {
        const inputStyle: React.CSSProperties = {margin: '10px'};
        const dateStyle: React.CSSProperties = {
            display: 'inline-block',
            margin: '10px'
        };
        return(
            <div>
                <div className="fukol-parent">
                    <div className="fukol-child">
                        <SelectField
                            floatingLabelText="Promotion"
                            style={inputStyle}
                        >
                            <MenuItem>Licence 3</MenuItem>
                            <MenuItem>Master 1</MenuItem>
                            <MenuItem>Master 2</MenuItem>
                        </SelectField>
                        <SelectField
                            floatingLabelText="Sexe"
                            style={inputStyle}
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
                            style={inputStyle}
                        />
                        <TextField 
                            floatingLabelText="Prénom"
                            style={inputStyle}
                        />
                    </div>
                </div>
                <div className="fukol-parent">
                    <div className="fukol-child">
                        <TextField 
                            floatingLabelText="Numéro de SS"
                            style={inputStyle}
                        />
                        <TextField 
                            floatingLabelText="Numéro étudiant"
                            style={inputStyle}
                        />
                        <TextField
                            floatingLabelText="Email"
                            style={inputStyle} 
                        />
                    </div>
                </div>
                <div className="fukol-parent">
                    <div className="fukol-child">
                        <DatePicker
                            floatingLabelText="Date de naissance"
                            style={dateStyle}
                        />
                        <TextField 
                            floatingLabelText="Téléphone"
                            style={inputStyle}
                        />
                    </div>
                </div>
                <div className="fukol-parent">
                    <div className="fukol-child">
                        <TextField 
                            floatingLabelText="Adresse"
                            style={inputStyle}
                        />
                    </div>
                </div>
            </div>
        )
    }
}