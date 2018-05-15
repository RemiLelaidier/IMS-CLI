import FormGroup from '@material-ui/core/FormGroup/FormGroup';
import { TextField } from 'material-ui';
import * as React from 'react';

import './Step.css';

export default class InsuranceStep extends React.Component {
    public render() {
        return (
            <div>
                <FormGroup row={true}>
                    <TextField 
                        label="Assurance"
                        className="input-text"
                    />
                    <TextField 
                        label="Numéro de la police"
                        className="input-text"
                    />
                </FormGroup>
            </div>
        );
    }
}