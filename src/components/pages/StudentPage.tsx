import * as React from 'react';

import { FlatButton, MenuItem, RaisedButton, SelectField } from 'material-ui';
import { Step, StepLabel, Stepper } from 'material-ui/Stepper';

import './StudentPage.css';

interface IStudentPageProps {
    onChangePage: (any);
    onSubmit: (any);
}

interface IStudentPageState {
    finished: boolean;
    stepIndex: number;
}

export class StudentPage extends React.Component<IStudentPageProps, IStudentPageState> {
    constructor(props: IStudentPageProps) {
        super(props);
        this.state = { 
            finished: false,
            stepIndex: 0
        }

        this.handleNext = this.handleNext.bind(this);
        this.handlePrev = this.handlePrev.bind(this);
    }

    public render (){
        return (
        <div>
            <div className="stepper-content">{this.stepContent(this.state.stepIndex)}</div>
            <Stepper activeStep={this.state.stepIndex} >
                <Step>
                    <StepLabel>Etudiant</StepLabel>
                </Step>
                <Step>
                    <StepLabel>Entreprise</StepLabel>
                </Step>
                <Step>
                    <StepLabel>Stage</StepLabel>
                </Step>
                <Step>
                    <StepLabel>Responsables</StepLabel>
                </Step>
                <Step>
                    <StepLabel>Informations complémentaires</StepLabel>
                </Step>
                <Step>
                    <StepLabel>Récapitulatif</StepLabel>
                </Step>
            </Stepper>
            <div>
                <FlatButton
                  label="Retour"
                  disabled={this.state.stepIndex === 0}
                  onClick={this.handlePrev}
                />
                <RaisedButton
                  label={this.state.stepIndex === 5 ? 'Terminé' : 'Suivant'}
                  primary={true}
                  onClick={this.handleNext}
                />
              </div>
        </div>
        );
    }

    private handlePrev(event: any) {
        if (this.state.stepIndex > 0) {
            this.setState({stepIndex: this.state.stepIndex - 1})
        }
    }

    private handleNext(event: any) {
        this.setState({
            finished: this.state.stepIndex >= 5,
            stepIndex: this.state.stepIndex + 1
        })
    }

    private stepContent(stepIndex: number) {
        switch (stepIndex) {
            case 0:
                return(
                    <div className="fukol-parent">
                        <div className="fukol-child">
                            <SelectField
                                floatingLabelText="Promotion"
                            >
                                <MenuItem>Licence 3</MenuItem>
                                <MenuItem>Master 1</MenuItem>
                                <MenuItem>Master 2</MenuItem>
                            </SelectField>
                            <SelectField
                                floatingLabelText="Sexe"
                            >
                                <MenuItem>M</MenuItem>
                                <MenuItem>F</MenuItem>
                                <MenuItem>Autre</MenuItem>
                            </SelectField>
                        </div>
                    </div>
                );
            default:
                return;
        }
    }
}