import * as React from 'react';

import './Step.css';

import FormGroup from '@material-ui/core/FormGroup/FormGroup';
import FormLabel from '@material-ui/core/FormLabel/FormLabel';
import TextField from '@material-ui/core/TextField/TextField';

export default class MoreStep extends React.Component {
    public render() {
        return (
            <div>
                <FormLabel component="legend">Informations complémentaires</FormLabel>
                <br />
                <FormGroup row={true}>
                    <TextField 
                        multiline={true}
                        fullWidth={true}     
                        rowsMax="4"
                    />
                </FormGroup>
                <p>Un récapitulatif vous sera fourni afin que vous validiez les informations</p>
                <p>A la fin du processus, votre convention de stage vous sera envoyée et envoyée à l'entreprise</p>
            </div>
        );
    }
}