import * as React from 'react';

import Button from '@material-ui/core/Button/Button';
import FormControl from '@material-ui/core/FormControl/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel/FormLabel';
import Radio from '@material-ui/core/Radio/Radio';
import RadioGroup from '@material-ui/core/RadioGroup/RadioGroup';
import { _handleField } from '../../validation/validation';
import ConventionPreview from '../ConventionPreview';
import { FormProps } from '../pages/StudentPage';
import { recapSchema } from './SchemaManager';

interface RecapProps extends FormProps {
    currentRow: any;
}

interface RecapState {
    errors: {};
    fields: { template: string };
    recap: boolean;
    recapTab: number;
    recapFields: any;
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
            errors: {},
            recap: false,
            recapTab: 0,
            recapFields: null
        }

        this._handleChange = _handleField.bind(this);
        this._handleRecap = this._handleRecap.bind(this);
        this._handleTableChange = this._handleTableChange.bind(this);
        this._handlePreviewClose = this._handlePreviewClose.bind(this);

        this.schema = recapSchema;

        let hasTemplate: boolean = false;

        const lastFields: any = this.props.getLastFields();
        if (Object.keys(lastFields).length > 0) {
            if (lastFields.template != null) {
                this.state.fields.template = lastFields.template;
                hasTemplate = true;

                // force validation, we consider it's "onError = false" because already checked when submitted (we're in previous situation)
                this.props.onError(false);
            }
        }

        if (!hasTemplate) {
            this.props.defaultField('template', 'france', this.constructor.name);
        }
    }

    public componentDidMount() {
        const mapping: any = {
            'StudentStep': 'etudiant',
            'CompanyStep': 'entreprise',
            'InternshipStep': 'stage',
            'ConcernedStep': 'responsables',
            'MoreStep': 'extras'
        };

        const recapFields = this.renameKeys(this.props.currentRow, mapping);
        delete recapFields.undefined;

        this.setState({ recapFields });
    }

    public renameKeys(obj: any, newKeys: any) {
        const keyValues = Object.keys(obj).map(key => {
            const newKey = newKeys[key] || key;
            return { [newKey]: obj[key] };
        });
        return Object.assign({}, ...keyValues);
    }

    public render() {
        return (
            <div>
                <FormLabel component="legend">Récapitulatif</FormLabel>
                <br />
                <Button onClick={this._handleRecap} variant="raised" color='primary'>Afficher</Button>
                <br />
                <ConventionPreview
                    opened={this.state.recap}
                    currentRow={this.state.recapFields}
                    activeTab={this.state.recapTab}
                    onCloseAction={this._handlePreviewClose}
                    onTableChange={this._handleTableChange}
                    onAction={null}
                    isAdmin={false}
                />
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
            </div>
        );
    }

    private _handleRecap(event: any) {
        this.setState({ recap: !this.state.recap });
    }

    private _handlePreviewClose(event: any) {
        this.setState({ recap: false });
    }

    private _handleTableChange(event: any, value: any) {
        this.setState({ recapTab: value });
    }
}