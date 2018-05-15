import * as React from 'react';

import FormGroup from '@material-ui/core/FormGroup/FormGroup';
import FormLabel from '@material-ui/core/FormLabel/FormLabel';
import Input from '@material-ui/core/Input/Input';

interface MoreProps {
    onError: (any);
    onFieldChange: (any);
}

interface MoreState {
    errors: {

    }
}

export default class MoreStep extends React.Component<MoreProps, MoreState> {
    public render() {
        return (
            <div>
                <FormLabel component="legend">Informations complémentaires</FormLabel>
                <br />
                <FormGroup row={true}>
                    <Input 
                        id="moreInfo"
                    />
                </FormGroup>
                <p>Un récapitulatif vous sera fourni afin que vous validiez les informations</p>
                <p>A la fin du processus, votre convention de stage vous sera envoyée et envoyée à l'entreprise</p>
            </div>
        );
    }
}