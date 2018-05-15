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

interface StudentPageProps {
    onChangePage: (any);
    onSubmit: (any);
}

interface StudentPageState {
    inError: boolean;
    stepIndex: number;
}

const stepCount = 6;

export class StudentPage extends React.Component<StudentPageProps, StudentPageState> {
    private steps: JSX.Element[];

    constructor(props: StudentPageProps) {
        super(props);

        // @Tool : put inError to true to bypass validation logic
        this.state = { 
            inError: false,
            stepIndex: 0
        }

        this._onStepError = this._onStepError.bind(this);
        this._handleNext = this._handleNext.bind(this);
        this._handlePrev = this._handlePrev.bind(this);
        
        this.steps = [
            <StudentStep key={0} onError={this._onStepError}/>, 
            <CompanyStep key={1} onError={this._onStepError}/>,
            <InternshipStep key={2} onError={this._onStepError}/>,
            <ConcernedStep key={3} onError={this._onStepError}/>,
            <MoreStep key={4} onError={this._onStepError}/>,
            <RecapStep key={5} onError={this._onStepError}/>
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

    private _stepContent(stepIndex: number) {
        return this.steps[stepIndex];
    }
}