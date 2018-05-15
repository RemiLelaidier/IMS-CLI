import FormGroup from '@material-ui/core/FormGroup/FormGroup';
import { TextField } from 'material-ui';
import * as React from 'react';

import './Step.css';

import FormLabel from '@material-ui/core/FormLabel/FormLabel';

export default class InsuranceStep extends React.Component {
    public render() {
        return (
            <div>
                <FormLabel component="legend">Compagnie d'assurance</FormLabel>
                <br />
                <FormGroup row={true}>
                    <TextField 
                        label="Assurance"
                        className="input-text"
                    />
                    <TextField 
                        label="Numéro de police"
                        className="input-text"
                    />
                </FormGroup>
            </div>
        );
    }
}