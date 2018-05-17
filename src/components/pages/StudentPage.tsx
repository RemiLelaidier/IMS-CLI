import axios from 'axios';
import * as React from 'react';

import IconButton from '@material-ui/core/IconButton/IconButton';
import Snackbar from '@material-ui/core/Snackbar/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
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
    defaultFields: (any);
    onError: (any);
    onFieldChange: (any);
}

// tslint:disable-next-line:no-empty-interface
interface StudentPageProps { }

interface StudentPageState {
    inError: boolean;
    stepIndex: number;
    steps: any;
    apiURL: string | undefined;
    snackbar: boolean;
    snackText: string;
}

const stepCount = 6;
// @Tool : put validationActivated to false to bypass validation logic
const validationActivated = false;

export class StudentPage extends React.Component<StudentPageProps, StudentPageState> {
    private _steps: JSX.Element[];

    constructor(props: StudentPageProps) {
        super(props);

        this.state = {
            inError: validationActivated,
            stepIndex: 0,
            steps: {},
            apiURL: process.env.REACT_APP_API,
            snackbar: false,
            snackText: 'Convention envoyée pour validation !'
        }

        this._onStepError = this._onStepError.bind(this);
        this._handleNext = this._handleNext.bind(this);
        this._handlePrev = this._handlePrev.bind(this);
        this._handleField = this._handleField.bind(this);
        this._handleSubmit = this._handleSubmit.bind(this);
        this._handleDefaultFields = this._handleDefaultFields.bind(this);
        this._handleSnackClose = this._handleSnackClose.bind(this);

        this._steps = [
            <StudentStep key={0} onError={this._onStepError} onFieldChange={this._handleField} defaultFields={this._handleDefaultFields}/>,
            <CompanyStep key={1} onError={this._onStepError} onFieldChange={this._handleField} defaultFields={this._handleDefaultFields}/>,
            <InternshipStep key={2} onError={this._onStepError} onFieldChange={this._handleField} defaultFields={this._handleDefaultFields}/>,
            <ConcernedStep key={3} onError={this._onStepError} onFieldChange={this._handleField} defaultFields={this._handleDefaultFields}/>,
            <MoreStep key={4} onError={this._onStepError} onFieldChange={this._handleField} defaultFields={this._handleDefaultFields}/>,
            <RecapStep key={5} onError={this._onStepError} defaultFields={this._handleDefaultFields} onFieldChange={this._handleField} onSubmit={this._handleSubmit} />
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

    public render() {
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
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={this.state.snackbar}
                    autoHideDuration={6000}
                    onClose={this._handleSnackClose}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">{this.state.snackText}</span>}
                    action={[
                        <IconButton
                        key="close"
                        aria-label="Fermer"
                        color="inherit"
                        onClick={this._handleSnackClose}
                        >
                            <CloseIcon />
                        </IconButton>,
                    ]}
                    />
            </div>
        );
    }

    private _handleDefaultFields(event: any, from: string) {
        const steps = Object.assign({}, this.state.steps);
        steps[from] = event;
        this.setState({steps});
    }

    private _handleField(event: any, from: string) {
        const steps = Object.assign({}, this.state.steps);
        if (steps[from]) {
            steps[from][event.target.id] = event.target.value;
        } else {
            steps[from] = {
                [event.target.id]: event.target.value
            }
        }
        this.setState({ steps });

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
                inError: validationActivated ? true : false
            });
        }
        console.log(this.state);
    }

    private _onStepError(inError: boolean) {
        if (validationActivated) {
            if (inError) {
                this.setState({ inError: true });
            } else {
                this.setState({ inError: false });
            }
        }
    }

    private _stepContent(stepIndex: number) {
        return this._steps[stepIndex];
    }

    private async _handleSubmit(event: any) {
        const mut = { snackbar: true, snackText: this.state.snackText };
        try {
            await axios.post(this.state.apiURL + 'conventions/create', this.state.steps);
            this.setState(mut);
        } catch {
            mut.snackText = 'Erreur inconnue, merci de réessayer';
            this.setState(mut);
        }

    }

    private _handleSnackClose(event: any){
        this.setState({snackbar: false});
    }
}