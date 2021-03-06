import axios from 'axios';
import * as React from 'react';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton/IconButton';
import Snackbar from '@material-ui/core/Snackbar/Snackbar';
import CloseIcon from '@material-ui/icons/Close';

import MobileStepper from '@material-ui/core/MobileStepper';
import Step from '@material-ui/core/Step/Step';
import StepLabel from '@material-ui/core/StepLabel/StepLabel';
import Stepper from '@material-ui/core/Stepper';
import CompanyStep from '../steps/CompanyStep';
import StudentStep from '../steps/StudentStep';

import ConcernedStep from '../steps/ConcernedStep';
import InternshipStep from '../steps/InternshipStep';
import MoreStep from '../steps/MoreStep';
import RecapStep from '../steps/RecapStep';

import './StudentPage.css';

export interface FormProps {
    defaultField: (any);
    getLastFields: (any);
    onError: (any);
    onFieldChange: (any);
}

interface StudentPageProps {
    onReadyToSign: (any);
}

interface StudentPageState {
    inError: boolean;
    stepIndex: number;
    steps: any;
    apiURL: string | undefined;
    snackbar: boolean;
    snackText: string;
    nextLabel: string;
}

const stepCount = 6;
// @Tool : put validationActivated to false to bypass validation logic
const validationActivated = false;

export class StudentPage extends React.Component<StudentPageProps, StudentPageState> {
    private _handleNext: (any);

    constructor(props: StudentPageProps) {
        super(props);

        this.state = {
            inError: validationActivated,
            stepIndex: 0,
            steps: {
                StudentStep: {},
                CompanyStep: {},
                InternshipStep: {},
                ConcernedStep: {},
                MoreStep: {},
                RecapStep: {}
            },
            apiURL: process.env.REACT_APP_API,
            snackbar: false,
            snackText: 'Convention envoyée pour validation !',
            nextLabel: 'Suivant'
        }

        this._onStepError = this._onStepError.bind(this);
        this._handleNext = this._doNext.bind(this);
        this._handlePrev = this._handlePrev.bind(this);
        this._handleField = this._handleField.bind(this);
        this._handleSubmit = this._handleSubmit.bind(this);
        this._handleDefaultField = this._handleDefaultField.bind(this);
        this._handleSnackClose = this._handleSnackClose.bind(this);
        this._handleGetLastFields = this._handleGetLastFields.bind(this);
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
                            <Button size="small" variant="raised" onClick={this._handleNext} disabled={this.state.inError}>
                                {this.state.nextLabel}
                            </Button>
                        }
                        backButton={
                            <Button size="small" variant="raised" onClick={this._handlePrev} disabled={this.state.stepIndex === 0}>
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

    private _handleDefaultField(key: any, value: any, from: string) {
        const steps = Object.assign({}, this.state.steps);
        steps[from][key] = value;
        this.setState({ steps });
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
            let nextLabel = this.state.nextLabel;
            if (this.state.stepIndex !== 4) {
                this._handleNext = this._doNext.bind(this);
                nextLabel = 'Suivant';
            }

            this.setState({
                nextLabel,
                stepIndex: this.state.stepIndex - 1
            })
        }
    }

    private _doNext(event: any) {
        if (!this.state.inError) {
            let nextLabel = this.state.nextLabel;
            if (this.state.stepIndex === 4) {
                this._handleNext = this._handleSubmit;
                nextLabel = 'Envoyer';
            }

            this.setState({
                nextLabel,
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
        switch (stepIndex) {
            case 1:
                return (<CompanyStep key={1} onError={this._onStepError} onFieldChange={this._handleField} defaultField={this._handleDefaultField} getLastFields={this._handleGetLastFields} />);
            case 2:
                return (<InternshipStep key={2} onError={this._onStepError} onFieldChange={this._handleField} defaultField={this._handleDefaultField} getLastFields={this._handleGetLastFields} />);
            case 3:
                return (<ConcernedStep key={3} onError={this._onStepError} onFieldChange={this._handleField} defaultField={this._handleDefaultField} getLastFields={this._handleGetLastFields} />);
            case 4:
                return (<MoreStep key={4} onError={this._onStepError} onFieldChange={this._handleField} defaultField={this._handleDefaultField} getLastFields={this._handleGetLastFields} />);
            case 5:
                return (<RecapStep
                    key={5}
                    onError={this._onStepError}
                    defaultField={this._handleDefaultField}
                    onFieldChange={this._handleField}
                    currentRow={this.state.steps}
                    getLastFields={this._handleGetLastFields}
                />);
            default:
                return (<StudentStep key={0} onError={this._onStepError} onFieldChange={this._handleField} defaultField={this._handleDefaultField} getLastFields={this._handleGetLastFields} />);
        }
    }

    private async _handleSubmit(event: any) {
        const mut = { snackbar: true, snackText: this.state.snackText };
        try {
            const create = await axios.post(this.state.apiURL + 'conventions/create', this.state.steps);
            this.setState(mut);
            this.props.onReadyToSign(true, create.data.data, create.data.links[0].shortId);
        } catch (error) {
            mut.snackText = 'Une erreur inconnue s\'est produite. Merci de réessayer dans quelques minutes !';
            this.setState(mut);
            this.props.onReadyToSign(false, null);
        }

    }

    private _handleSnackClose(event: any) {
        this.setState({ snackbar: false });
    }

    private _handleGetLastFields(event: any) {
        switch(this.state.stepIndex) {
            case 1:
                return this.state.steps.CompanyStep;
            case 2:
                return this.state.steps.InternshipStep;
            case 3:
                return this.state.steps.ConcernedStep;
            case 4:
                return this.state.steps.MoreStep;
            case 5:
                return this.state.steps.RecapStep;
            default:
                return this.state.steps.StudentStep;
        }
    }
}