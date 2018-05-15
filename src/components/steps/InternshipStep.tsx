import * as React from 'react';

import './Step.css';

import FormControl from '@material-ui/core/FormControl/FormControl';
import FormGroup from '@material-ui/core/FormGroup/FormGroup';
import FormLabel from '@material-ui/core/FormLabel/FormLabel';
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import Select from '@material-ui/core/Select/Select';
import TextField from '@material-ui/core/TextField/TextField';

export default class InternshipStep extends React.Component {
    public render() {
        return (
            <div>
                <FormLabel component="legend">Informations sur le stage</FormLabel>
                <br />
                <FormGroup row={true}>
                    <FormControl>
                        <TextField 
                            label="Intitulé du stage"
                            className="internship_title"
                        />
                    </FormControl>
                    <FormControl>
                        <TextField 
                            label="Description"
                            className="internship_description"
                        />
                    </FormControl>
                </FormGroup>
                <br />
                <FormGroup row={true}>
                    <FormControl>
                        <TextField
                            className="input-date"
                            id="date"
                            label="Date de début"
                            type="date"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </FormControl>
                    <FormControl>
                        <TextField
                            className="input-date"
                            id="date"
                            label="Date de fin"
                            type="date"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </FormControl>
                </FormGroup>
                <FormGroup row={true}>
                    <FormControl>
                        <TextField 
                            label="Durée hebdomadaire"
                            className="duree-hebdo"
                        />
                    </FormControl>
                    <FormControl>
                        <TextField 
                            label="Horaires"
                            className="horaires_text"
                        />
                    </FormControl>
                </FormGroup>
                <FormGroup row={true}>
                    <FormControl>
                        <p>Présence la nuit, le dimanche et les jours fériés ?</p>
                        <TextField 
                            className="extra_horaires_text"
                        />
                    </FormControl>
                </FormGroup>
                <p>Pour un stage en France, lorsque la durée du stage est supérieure à deux mois consécutifs (ou non), celui-ci
              fait l'objet d'une gratification, et qui sera due à compter du premier jour du premier mois de stage et devra
              faire l'objet d'un versement mensuel.</p>
              <FormGroup row={true}>
                <FormControl>
                    <TextField 
                        label="Gratification"
                        className="internship_remuneration"
                    />
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="remuneration_way">Rémunération</InputLabel>
                    <Select
                        native={true}
                        className="input-text"
                        inputProps={{
                            id: 'remuneration_way',
                        }}
                    >
                        <option>Virement</option>
                        <option>Chèque</option>
                        <option>Autre</option>
                    </Select>
                 </FormControl>
                </FormGroup>
                <FormGroup row={true}>
                    <FormControl>
                        <TextField 
                            label="Avantages fournis"
                            className="internship_advantages"
                        />
                    </FormControl>
                </FormGroup>
            </div>

            
            
        );
    }
}