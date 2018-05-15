import * as Joi from 'joi';
import * as React from 'react';

import './Step.css';

import FormControl from '@material-ui/core/FormControl/FormControl';
import FormGroup from '@material-ui/core/FormGroup/FormGroup';
import FormLabel from '@material-ui/core/FormLabel/FormLabel';
import Input from '@material-ui/core/Input/Input';
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import Select from '@material-ui/core/Select/Select';
import { _handleField } from '../../validation/validation';

interface InternshipProps {
    onError: (any);
}

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
        intituleStage: string,
        descriptionStage: string,
        dateDebutStage: string,
        dateFinStage: string,
        dureeHebdoStage: string,
        horairesStage: string,
        presenceFree: string,
        gratificationStage: string,
        typeRemuneration: string,
        avantagesStage: string
    }
}
export default class InternshipStep extends React.Component<InternshipProps, InternshipState> {
    public schema: any;
    private _handleChange: any;

    constructor(props: InternshipProps){
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
                intituleStage: '',
                descriptionStage: '',
                dateDebutStage: '',
                dateFinStage: '',
                dureeHebdoStage: '',
                horairesStage: '',
                presenceFree: '',
                gratificationStage: '',
                typeRemuneration: '',
                avantagesStage: ''
            }
        }

        this._handleChange = _handleField.bind(this);
        this.schema = {
            intituleStage: Joi.string().min(2),
            descriptionStage: Joi.string().min(20),
            dateDebutStage: Joi.string().regex(/^(0?[1-9]|[12][0-9]|3[01])[\/](0?[1-9]|1[012])[\/\-]\d{4}$/),
            dateFinStage: Joi.string().regex(/^(0?[1-9]|[12][0-9]|3[01])[\/](0?[1-9]|1[012])[\/\-]\d{4}$/),
            dureeHebdoStage: Joi.string().min(10),
            horairesStage: Joi.string().min(10),
            presenceFree: Joi.string().min(2),
            gratificationStage: Joi.string().min(2),
            typeRemuneration: Joi.string().min(2),
            avantagesStage: Joi.string().min(2)
        };
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
                            id="intituleStage"
                            onChange={this._handleChange}
                        />
                    </FormControl>
                    <FormControl required={true} error={this.state.errors.descriptionStage}>
                        <InputLabel htmlFor="descriptionStage">Description</InputLabel>
                        <Input 
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
                            id="dateDebutStage"
                            onChange={this._handleChange}
                        />
                    </FormControl>
                    <FormControl required={true} error={this.state.errors.dateFinStage}>
                        <InputLabel htmlFor="dateFinStage">Date de fin</InputLabel>
                        <Input
                            id="dateFinStage"
                            onChange={this._handleChange}
                        />
                    </FormControl>
                </FormGroup>
                <FormGroup row={true}>
                    <FormControl required={true} error={this.state.errors.dureeHebdoStage}>
                        <InputLabel htmlFor="dureeHebdoStage">Durée hebdomadaire</InputLabel>
                        <Input 
                            id="dureeHebdoStage"
                            onChange={this._handleChange}
                        />
                    </FormControl>
                    <FormControl required={true} error={this.state.errors.horairesStage}>
                        <InputLabel htmlFor="horairesStage">Horaires</InputLabel>
                        <Input 
                            id="horairesStage"
                            onChange={this._handleChange}
                        />
                    </FormControl>
                </FormGroup>
                <FormGroup row={true}>
                    <FormControl required={true} error={this.state.errors.presenceFree}>
                        <p>Présence la nuit, le dimanche et les jours fériés ?</p>
                        <Input 
                            id="presenceFree"
                            onChange={this._handleChange}
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
                        id="gratificationStage"
                        onChange={this._handleChange}
                    />
                </FormControl>
                <FormControl required={true} error={this.state.errors.typeRemuneration}>
                    <InputLabel htmlFor="typeRemuneration">Rémunération</InputLabel>
                    <Select
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
                            id="avantagesStage"
                            onChange={this._handleChange}
                        />
                    </FormControl>
                </FormGroup>
            </div>

            
            
        );
    }
}