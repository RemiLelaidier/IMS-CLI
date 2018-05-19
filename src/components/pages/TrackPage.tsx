import * as React from 'react';

import Button from '@material-ui/core/Button/Button';
import Paper from '@material-ui/core/Paper/Paper';
import Step from '@material-ui/core/Step/Step';
import StepLabel from '@material-ui/core/StepLabel/StepLabel';
import Stepper from '@material-ui/core/Stepper/Stepper';
import Typography from '@material-ui/core/Typography/Typography';

import ConventionPreview from '../ConventionPreview';

interface TrackPageState {
    apiURL: string | undefined;
    preview: boolean;
    tracked: any;
    previewTab: number;
}

interface TrackPageProps { 
    tracked: any;
}

export class TrackPage extends React.Component<TrackPageProps, TrackPageState> {
    constructor(props: TrackPageProps) {
        super(props);

        this.state = {
            apiURL: process.env.REACT_APP_API,
            preview: false,
            tracked: null,
            previewTab: 0
        }

        this._handlePreview = this._handlePreview.bind(this);
        this._handlePreviewClose = this._handlePreviewClose.bind(this);
        this._handleTableChange = this._handleTableChange.bind(this);
    }

    public async componentDidMount(){
        console.log('tracking', this.props.tracked);
    }

    public render() {
        const steps = ["Soumise", "Validée", "Envoyée à l'entreprise", "Signée par l'université", "Terminée"]
        return (
            <Paper style={{ margin: 10, padding: 10 }}>
                <ConventionPreview 
                    opened={this.state.preview} 
                    currentRow={this.props.tracked} 
                    activeTab={this.state.previewTab} 
                    isAdmin={false}
                    onCloseAction={this._handlePreviewClose}
                    onTableChange={this._handleTableChange}
                />
                <Typography variant="headline" color="inherit">
                    Suivi de convention
                </Typography>
                <br />
                <Typography variant="subheading" color="inherit">
                    {this.props.tracked.etudiant.nom + " " + this.props.tracked.etudiant.prenom}
                </Typography>
                <br />
                <Button onClick={this._handlePreview} variant="raised" color='primary'>Prévisualiser</Button>
                <br />
                <Stepper activeStep={this.props.tracked.statut.status} alternativeLabel={true}>
                {steps.map(label => {
                    return (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                    );
                })}
                </Stepper>
            </Paper>
        );
    }

    private _handlePreview(event: any){
        this.setState({preview: true});
    }

    private _handlePreviewClose(event: any) {
        this.setState({preview: false});
    }

    private _handleTableChange(event: any, value: any) {
        this.setState({previewTab: value});
    }
}