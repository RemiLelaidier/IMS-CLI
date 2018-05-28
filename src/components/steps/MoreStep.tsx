import * as React from 'react';

import FormGroup from '@material-ui/core/FormGroup/FormGroup';
import FormLabel from '@material-ui/core/FormLabel/FormLabel';
import Input from '@material-ui/core/Input/Input';

import { _handleField, ValidatedStep } from '../../validation/validation';
import { FormProps } from '../pages/StudentPage';
import { moreSchema } from './SchemaManager';

interface MoreState {
    errors: {
        complementaires: boolean
    },
    fields: {
        complementaires: string | null
    }
}

export default class MoreStep extends React.Component<FormProps, MoreState> implements ValidatedStep {
    public schema: any;
    private _handleChange: any;

    constructor(props: FormProps) {
        super(props);
        this.state = {
            errors: {
                complementaires: false
            },
            fields: {
                complementaires: null
            }
        }

        this._handleChange = _handleField.bind(this);
        this.schema = moreSchema;

        const lastFields: any = this.props.getLastFields();
        if (Object.keys(lastFields).length > 0) {
            if (lastFields.complementaires != null) {
                this.state.fields.complementaires = lastFields.complementaires;
            }
        }

        // force validation, this step is optional
        this.props.onError(false);
    }

    public render() {
        return (
            <div>
                <FormLabel component="legend">Informations complémentaires</FormLabel>
                <br />
                <FormGroup row={true}>
                    <Input
                        value={this.state.fields.complementaires ? this.state.fields.complementaires : ""}
                        id="complementaires"
                        onChange={this._handleChange}
                    />
                </FormGroup>
                <p>Un récapitulatif vous sera fourni afin que vous validiez les informations.</p>
                <p>Une fois validée, un lien de suivi vous sera fourni</p>
            </div>
        );
    }
}