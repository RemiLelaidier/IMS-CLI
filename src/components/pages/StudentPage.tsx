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

export interface FormProps {
    onError: (any);
    onFieldChange: (any);
}

interface StudentPageProps {
    onChangePage: (any);
    onSubmit: (any);
}

interface StudentPageState {
    inError: boolean;
    stepIndex: number;
    steps: any;
}

const stepCount = 6;

export class StudentPage extends React.Component<StudentPageProps, StudentPageState> {
    private _steps: JSX.Element[];

    constructor(props: StudentPageProps) {
        super(props);

        // @Tool : put inError to false to bypass validation logic
        this.state = { 
            inError: true,
            stepIndex: 0,
            steps: {}
        }

        this._onStepError = this._onStepError.bind(this);
        this._handleNext = this._handleNext.bind(this);
        this._handlePrev = this._handlePrev.bind(this);
        this._handleField = this._handleField.bind(this);
        this._handleSubmit = this._handleSubmit.bind(this);
        
        this._steps = [
            <StudentStep key={0} onError={this._onStepError} onFieldChange={this._handleField}/>, 
            <CompanyStep key={1} onError={this._onStepError} onFieldChange={this._handleField}/>,
            <InternshipStep key={2} onError={this._onStepError} onFieldChange={this._handleField}/>,
            <ConcernedStep key={3} onError={this._onStepError} onFieldChange={this._handleField}/>,
            <MoreStep key={4} onError={this._onStepError} onFieldChange={this._handleField}/>,
            <RecapStep key={5} onError={this._onStepError} onFieldChange={this._handleField} onSubmit={this._handleSubmit} />
        ];

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
            <div className="stepper-content">{this._stepContent(this.state.stepIndex)}</div>
            <div className="stepper-action">
                <Stepper activeStep={this.state.stepIndex} orientation={orientation}>
                    {this._getSteps()}
                </Stepper>
                <MobileStepper 
                    steps={stepCount}
                    variant="progress"
                    activeStep={this.state.stepIndex}
                    nextButton={
                        <Button size="small" onClick={this._handleNext} disabled={this.state.inError}>
                        Suivant
                        </Button>
                    }
                    backButton={
                        <Button size="small" onClick={this._handlePrev} disabled={this.state.stepIndex === 0}>
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

    private _handleField(event: any, from: string) {
        const steps = Object.assign({}, this.state.steps);
        if(steps[from]) {
            steps[from][event.target.id] = event.target.value;
        } else {
            steps[from] = {
                [event.target.id]: event.target.value
            }
        }
        this.setState({steps});

        console.log('valid field change received', {[event.target.id]: event.target.value});
        console.log('steps', steps);
    }

    private _handlePrev(event: any) {
        if (this.state.stepIndex > 0) {
            this.setState({
                stepIndex: this.state.stepIndex - 1
            })
        }
    }

    private _handleNext(event: any) {
        if (!this.state.inError) { 
            this.setState({
                stepIndex: this.state.stepIndex + 1,
                inError: true
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

    private _stepContent(stepIndex: number) {
        return this._steps[stepIndex];
    }

    private _handleSubmit(event: any){
        console.log('Yay !', this.state.steps);
    }
}