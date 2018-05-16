import * as React from 'react';

import FormGroup from '@material-ui/core/FormGroup/FormGroup';
import FormLabel from '@material-ui/core/FormLabel/FormLabel';
import Input from '@material-ui/core/Input/Input';

import { _handleField, ValidatedStep } from '../../validation/validation';
import { FormProps } from '../pages/StudentPage';
import { moreSchema } from './SchemaManager';

interface MoreState {
    errors: {
        moreInfo: boolean
    },
    fields: {
        moreInfo: string | null
    }
}

export default class MoreStep extends React.Component<FormProps, MoreState> implements ValidatedStep {
    public schema: any;
    private _handleChange: any;

    constructor(props: FormProps) {
        super(props);
        this.state = {
            errors: {
                moreInfo: false
            },
            fields: {
                moreInfo: null
            }
        }

        this._handleChange = _handleField.bind(this);
        this.schema = moreSchema;
    }

    public render() {
        return (
            <div>
                <FormLabel component="legend">Informations complémentaires</FormLabel>
                <br />
                <FormGroup row={true}>
                    <Input
                        id="moreInfo"
                        onChange={this._handleChange}
                    />
                </FormGroup>
                <p>Un récapitulatif vous sera fourni afin que vous validiez les informations</p>
                <p>A la fin du processus, votre convention de stage vous sera envoyée et envoyée à l'entreprise</p>
            </div>
        );
    }
}