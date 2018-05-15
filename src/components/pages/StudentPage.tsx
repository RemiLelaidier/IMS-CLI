import * as React from 'react';

import Button from 'material-ui/Button';

import Stepper, { Step, StepLabel } from 'material-ui/Stepper';

import MobileStepper from 'material-ui/MobileStepper';
import CompanyStep from '../steps/CompanyStep';
import InsuranceStep from '../steps/InsuranceStep';
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
    finished: boolean;
    stepIndex: number;
}

const stepCount = 7;

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
                <StepLabel style={labelStyle}>Assurance</StepLabel>
            </Step>,
            <Step key={2}>
                <StepLabel style={labelStyle}>Entreprise</StepLabel>
            </Step>,
            <Step key={3}>
                <StepLabel style={labelStyle}>Stage</StepLabel>
            </Step>,
            <Step key={4}>
                <StepLabel style={labelStyle}>Responsables</StepLabel>
            </Step>,
            <Step key={5}>
                <StepLabel style={labelStyle}>Informations complémentaires</StepLabel>
            </Step>,
            <Step key={6}>
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
                        <Button size="small" onClick={this.handleNext} disabled={this.state.stepIndex === stepCount}>
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
                finished: false,
                stepIndex: this.state.stepIndex - 1
            })
        }
    }

    private handleNext(event: any) {
        if (!this.state.finished) { 
            this.setState({
                finished: this.state.stepIndex === stepCount,
                stepIndex: this.state.stepIndex + 1
            });
        }
    }

    private stepContent(stepIndex: number) {
        switch (stepIndex) {
            case 0:
                return (<StudentStep />);
            case 1:
                return (<InsuranceStep />);
            case 2: 
                return (<CompanyStep />);
            case 3:
                return (<InternshipStep />);
            case 4:
                return (<ConcernedStep />);
            case 5:
                return (<MoreStep />);
            case 6:
                return (<RecapStep />);
            default:
                console.warn('Step not found')
                return;
        }
    }
}