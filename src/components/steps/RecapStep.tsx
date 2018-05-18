import * as React from 'react';

import Button from '@material-ui/core/Button/Button';
import FormControl from '@material-ui/core/FormControl/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel/FormLabel';
import Radio from '@material-ui/core/Radio/Radio';
import RadioGroup from '@material-ui/core/RadioGroup/RadioGroup';
import { _handleField } from '../../validation/validation';
import { FormProps } from '../pages/StudentPage';
import { recapSchema } from './SchemaManager';

interface RecapProps extends FormProps {
    onSubmit: (any);
}

interface RecapState {
    errors: {

    },
    fields: {
        template: string
    }
}
export default class RecapStep extends React.Component<RecapProps, RecapState> {
    public schema: any;
    private _handleChange: any;

    constructor(props: RecapProps) {
        super(props);
        this.state = {
            fields: {
                template: 'france'
            },
            errors: {}
        }
        this.schema = recapSchema;
        this._handleSubmit = this._handleSubmit.bind(this);
        this._handleChange = _handleField.bind(this);
        this.props.defaultFields({template: 'france'});
    }

    public render() {
        return (
            <div>
                <FormLabel component="legend">Récapitulatif</FormLabel>
                <br />
                <FormControl component="fieldset" required={true}>
                    <FormLabel component="legend">Type de convention demandée :</FormLabel>
                    <RadioGroup
                        aria-label="Type de convention"
                        name="template"
                        onChange={this._handleChange}
                        value={this.state.fields.template}
                    >
                        <FormControlLabel value="france" control={<Radio id="template" />} label="Stage en France" />
                        <FormControlLabel value="foreign" control={<Radio id="template" />} label="Stage à l'étranger" />
                    </RadioGroup>
                </FormControl>
                <Button size="small" onClick={this._handleSubmit}>
                    Envoyer
                </Button>
            </div>
        );
    }

    private _handleSubmit(event: any) {
        this.props.onSubmit(event);
    }
}