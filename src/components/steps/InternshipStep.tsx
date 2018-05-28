import * as React from 'react';

import FormControl from '@material-ui/core/FormControl/FormControl';
import FormGroup from '@material-ui/core/FormGroup/FormGroup';
import FormLabel from '@material-ui/core/FormLabel/FormLabel';
import Input from '@material-ui/core/Input/Input';
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import Select from '@material-ui/core/Select/Select';

import { _handleField, ValidatedStep } from '../../validation/validation';
import { FormProps } from '../pages/StudentPage';
import { internshipSchema } from './SchemaManager';

interface InternshipState {
    errors: {
        intituleStage: boolean,
        descriptionStage: boolean,
        dateDebutStage: boolean,
        dateFinStage: boolean,
        dureeHebdoStage: boolean,
        horairesStage: boolean,
        presenceFree: boolean,
        gratificationStage: boolean,
        typeRemuneration: boolean,
        avantagesStage: boolean
    },
    fields: {
        intituleStage: string | null,
        descriptionStage: string | null,
        dateDebutStage: string | null,
        dateFinStage: string | null,
        dureeHebdoStage: string | null,
        horairesStage: string | null,
        presenceFree: string | null,
        gratificationStage: string | null,
        typeRemuneration: string | null,
        avantagesStage: string | null
    }
}

export default class InternshipStep extends React.Component<FormProps, InternshipState> implements ValidatedStep {
    public schema: any;
    private _handleChange: any;

    constructor(props: FormProps) {
        super(props);
        this.state = {
            errors: {
                intituleStage: false,
                descriptionStage: false,
                dateDebutStage: false,
                dateFinStage: false,
                dureeHebdoStage: false,
                horairesStage: false,
                presenceFree: false,
                gratificationStage: false,
                typeRemuneration: false,
                avantagesStage: false
            },
            fields: {
                intituleStage: null,
                descriptionStage: null,
                dateDebutStage: null,
                dateFinStage: null,
                dureeHebdoStage: null,
                horairesStage: null,
                presenceFree: null,
                gratificationStage: null,
                typeRemuneration: 'Virement',
                avantagesStage: null
            }
        }

        this._handleChange = _handleField.bind(this);
        this.schema = internshipSchema;

        let hasTypeRemuneration: boolean = false;

        const lastFields: any = this.props.getLastFields();
        if (Object.keys(lastFields).length > 0) {
            if (lastFields.intituleStage != null) {
                this.state.fields.intituleStage = lastFields.intituleStage;
            }
            if (lastFields.descriptionStage != null) {
                this.state.fields.descriptionStage = lastFields.descriptionStage;
            }
            if (lastFields.dateDebutStage != null) {
                this.state.fields.dateDebutStage = lastFields.dateDebutStage;
            }
            if (lastFields.dateFinStage != null) {
                this.state.fields.dateFinStage = lastFields.dateFinStage;
            }
            if (lastFields.dureeHebdoStage != null) {
                this.state.fields.dureeHebdoStage = lastFields.dureeHebdoStage;
            }
            if (lastFields.horairesStage != null) {
                this.state.fields.horairesStage = lastFields.horairesStage;
            }
            if (lastFields.presenceFree != null) {
                this.state.fields.presenceFree = lastFields.presenceFree;
            }
            if (lastFields.gratificationStage != null) {
                this.state.fields.gratificationStage = lastFields.gratificationStage;
            }
            if (lastFields.typeRemuneration != null) {
                this.state.fields.typeRemuneration = lastFields.typeRemuneration;
                hasTypeRemuneration = true;
            }
            if (lastFields.avantagesStage != null) {
                this.state.fields.avantagesStage = lastFields.avantagesStage;
            }

            if (lastFields.intituleStage && lastFields.descriptionStage && lastFields.dateDebutStage && lastFields.dateFinStage && lastFields.dureeHebdoStage
                && lastFields.horairesStage && lastFields.presenceFree && lastFields.gratificationStage && lastFields.typeRemuneration && lastFields.avantagesStage) {
                // force validation, we consider it's "onError = false" because already checked when submitted (we're in previous situation)
                this.props.onError(false);
            }
        }

        if (!hasTypeRemuneration) {
            this.props.defaultField('typeRemuneration', 'Virement', this.constructor.name);
        }
    }

    public render() {
        return (
            <div>
                <FormLabel component="legend">Informations sur le stage</FormLabel>
                <br />
                <FormGroup row={true}>
                    <FormControl required={true} error={this.state.errors.intituleStage}>
                        <InputLabel htmlFor="intituleStage">Intitulé du stage</InputLabel>
                        <Input
                            value={this.state.fields.intituleStage ? this.state.fields.intituleStage : ""}
                            id="intituleStage"
                            onChange={this._handleChange}
                        />
                    </FormControl>
                    <FormControl required={true} error={this.state.errors.descriptionStage}>
                        <InputLabel htmlFor="descriptionStage">Description</InputLabel>
                        <Input
                            value={this.state.fields.descriptionStage ? this.state.fields.descriptionStage : ""}
                            id="descriptionStage"
                            onChange={this._handleChange}
                        />
                    </FormControl>
                </FormGroup>
                <br />
                <FormGroup row={true}>
                    <FormControl required={true} error={this.state.errors.dateDebutStage}>
                        <InputLabel htmlFor="dateDebutStage">Date de début</InputLabel>
                        <Input
                            value={this.state.fields.dateDebutStage ? this.state.fields.dateDebutStage : ""}
                            id="dateDebutStage"
                            onChange={this._handleChange}
                            placeholder={"01/02/" + new Date().getFullYear()}
                        />
                    </FormControl>
                    <FormControl required={true} error={this.state.errors.dateFinStage}>
                        <InputLabel htmlFor="dateFinStage">Date de fin</InputLabel>
                        <Input
                            value={this.state.fields.dateFinStage ? this.state.fields.dateFinStage : ""}
                            id="dateFinStage"
                            onChange={this._handleChange}
                            placeholder={"31/03/" + new Date().getFullYear()}
                        />
                    </FormControl>
                </FormGroup>
                <FormGroup row={true}>
                    <FormControl required={true} error={this.state.errors.dureeHebdoStage}>
                        <InputLabel htmlFor="dureeHebdoStage">Durée hebdomadaire</InputLabel>
                        <Input
                            value={this.state.fields.dureeHebdoStage ? this.state.fields.dureeHebdoStage : ""}
                            id="dureeHebdoStage"
                            onChange={this._handleChange}
                            placeholder="35 heures"
                        />
                    </FormControl>
                    <FormControl required={true} error={this.state.errors.horairesStage}>
                        <InputLabel htmlFor="horairesStage">Horaires</InputLabel>
                        <Input
                            value={this.state.fields.horairesStage ? this.state.fields.horairesStage : ""}
                            id="horairesStage"
                            onChange={this._handleChange}
                            placeholder="Du lundi au vendredi, 8h - 16h"
                        />
                    </FormControl>
                </FormGroup>
                <FormGroup row={true}>
                    <FormControl required={true} error={this.state.errors.presenceFree}>
                        <p>Présence la nuit, le dimanche et les jours fériés ? <small><b>*</b></small></p>
                        <Input
                            value={this.state.fields.presenceFree ? this.state.fields.presenceFree : ""}
                            id="presenceFree"
                            onChange={this._handleChange}
                            placeholder="Oui le dimanche / Non jamais"
                        />
                    </FormControl>
                </FormGroup>
                <p>Pour un stage en France, lorsque la durée du stage est supérieure à deux mois consécutifs (ou non), celui-ci
              fait l'objet d'une gratification, et qui sera due à compter du premier jour du premier mois de stage et devra
              faire l'objet d'un versement mensuel.</p>
                <FormGroup row={true}>
                    <FormControl required={true} error={this.state.errors.gratificationStage}>
                        <InputLabel htmlFor="gratificationStage">Gratification</InputLabel>
                        <Input
                            value={this.state.fields.gratificationStage ? this.state.fields.gratificationStage : ""}
                            id="gratificationStage"
                            onChange={this._handleChange}
                        />
                    </FormControl>
                    <FormControl required={true} error={this.state.errors.typeRemuneration}>
                        <InputLabel htmlFor="typeRemuneration">Rémunération</InputLabel>
                        <Select
                            value={this.state.fields.typeRemuneration ? this.state.fields.typeRemuneration : undefined}
                            id="typeRemuneration"
                            onChange={this._handleChange}
                            native={true}
                        >
                            <option>Virement</option>
                            <option>Chèque</option>
                            <option>Autre</option>
                        </Select>
                    </FormControl>
                </FormGroup>
                <FormGroup row={true}>
                    <FormControl required={true} error={this.state.errors.avantagesStage}>
                        <InputLabel htmlFor="avantagesStage">Avantages fournis</InputLabel>
                        <Input
                            value={this.state.fields.avantagesStage ? this.state.fields.avantagesStage : ""}
                            id="avantagesStage"
                            onChange={this._handleChange}
                        />
                    </FormControl>
                </FormGroup>
            </div>
        );
    }
}