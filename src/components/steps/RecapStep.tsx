import * as React from 'react';

import Button from '@material-ui/core/Button/Button';
import FormLabel from '@material-ui/core/FormLabel/FormLabel';

interface RecapProps {
    onError: (any);
    onFieldChange: (any);
    onSubmit: (any);
}

interface RecapState {
    errors: {

    }
}
export default class RecapStep extends React.Component<RecapProps, RecapState> {
    constructor(props: RecapProps){
        super(props);
        this._handleSubmit = this._handleSubmit.bind(this);
    }

    public render() {
        return (
            <div>
                <FormLabel component="legend">Récapitulatif</FormLabel>
                <Button size="small" onClick={this._handleSubmit}>
                    Envoyer
                </Button>
            </div>
        );
    }
    
    private _handleSubmit(event: any){
        this.props.onSubmit(event);
    }
}