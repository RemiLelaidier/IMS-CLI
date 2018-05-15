import { TextField } from 'material-ui';
import * as React from 'react';

import './Step.css';

export default class InsuranceStep extends React.Component {
    public render() {
        return (
            <div>
                <div className="fukol-parent">
                    <div className="fukol-child">
                        <TextField 
                            label="Compagnie d'assurance"
                            className="input-text"
                        />
                    </div>
                </div>
                <div className="fukol-parent">
                    <div className="fukol-child">
                        <TextField 
                            label="Numéro de la police"
                            className="input-text"
                        />
                    </div>
                </div>
            </div>
        );
    }
}