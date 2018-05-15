import * as React from 'react';

import Button from 'material-ui/Button';

import Stepper, { Step, StepLabel } from 'material-ui/Stepper';

import MobileStepper from 'material-ui/MobileStepper';
import CompanyStep from '../steps/CompanyStep';
import StudentStep from '../steps/StudentStep';

import ConcernedStep from '../steps/ConcernedStep';
import InternshipStep from '../steps/InternshipStep';
import MoreStep from '../steps/MoreStep';
import RecapStep from '../steps/RecapStep';

import './StudentPage.css';

interface IStudentPageProps {
    onChangePage: (any);
    onSubmit: (any);
}

interface IStudentPageState {
    inError: boolean;
    stepIndex: number;
}

const stepCount = 6;

export class StudentPage extends React.Component<IStudentPageProps, IStudentPageState> {
    constructor(props: IStudentPageProps) {
        super(props);
        
        // @Tool : put inError to true to bypass validation logic
        this.state = { 
            inError: true,
            stepIndex: 0
        }

        this.handleNext = this.handleNext.bind(this);
        this.handlePrev = this.handlePrev.bind(this);
        this._onStepError = this._onStepError.bind(this);
    }

    public _getSteps() {
        const labelStyle: React.CSSProperties = {
            fontSize: '10px',
            paddingLeft: '0',
            paddingRight: '0'
        };

        return [
            <Step key={0}>
                <StepLabel style={labelStyle}>Etudiant</StepLabel>
            </Step>,
            <Step key={1}>
                <StepLabel style={labelStyle}>Entreprise</StepLabel>
            </Step>,
            <Step key={2}>
                <StepLabel style={labelStyle}>Stage</StepLabel>
            </Step>,
            <Step key={3}>
                <StepLabel style={labelStyle}>Responsables</StepLabel>
            </Step>,
            <Step key={4}>
                <StepLabel style={labelStyle}>Informations complémentaires</StepLabel>
            </Step>,
            <Step key={5}>
                <StepLabel style={labelStyle}>Récapitulatif</StepLabel>
            </Step>
        ];
    }

    public render (){
        const orientation = 'horizontal';

        return (
        <div>
            <div className="stepper-content">{this.stepContent(this.state.stepIndex)}</div>
            <div className="stepper-action">
                <Stepper activeStep={this.state.stepIndex} orientation={orientation}>
                    {this._getSteps()}
                </Stepper>
                <MobileStepper 
                    steps={stepCount}
                    variant="progress"
                    activeStep={this.state.stepIndex}
                    nextButton={
                        <Button size="small" onClick={this.handleNext} disabled={this.state.inError}>
                        Suivant
                        </Button>
                    }
                    backButton={
                        <Button size="small" onClick={this.handlePrev} disabled={this.state.stepIndex === 0}>
                        Précédent
                        </Button>
                    }
                >
                    {this._getSteps()}
                </MobileStepper>
            </div>
        </div>
        );
    }

    private handlePrev(event: any) {
        if (this.state.stepIndex > 0) {
            this.setState({
                inError: false,
                stepIndex: this.state.stepIndex - 1
            })
        }
    }

    private handleNext(event: any) {
        if (!this.state.inError) { 
            this.setState({
                inError: this.state.stepIndex === stepCount,
                stepIndex: this.state.stepIndex + 1
            });
        }
    }

    private _onStepError(inError: boolean){
        if(inError){
            this.setState({inError: true});
        } else {
            this.setState({inError: false});
        }
    }

    private stepContent(stepIndex: number) {
        switch (stepIndex) {
            case 0:
                return (<StudentStep onError={this._onStepError}/>);
            case 1: 
                return (<CompanyStep onError={this._onStepError}/>);
            case 2:
                return (<InternshipStep onError={this._onStepError}/>);
            case 3:
                return (<ConcernedStep onError={this._onStepError}/>);
            case 4:
                return (<MoreStep onError={this._onStepError}/>);
            case 5:
                return (<RecapStep onError={this._onStepError}/>);
            default:
                console.warn('Step not found')
                return;
        }
    }
}