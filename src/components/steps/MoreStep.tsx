import * as React from 'react';

import './Step.css';

import FormGroup from '@material-ui/core/FormGroup/FormGroup';
import TextField from '@material-ui/core/TextField/TextField';

export default class MoreStep extends React.Component {
    public render() {
        return (
            <div>
                <FormGroup row={true}>
                    <TextField 
                        label="Informations complémentaires"
                        multiline={true}
                    />
                </FormGroup>
            </div>
        );
    }
}