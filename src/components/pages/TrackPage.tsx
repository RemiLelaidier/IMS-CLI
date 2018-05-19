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
        const steps = [
            { label: "Soumise", explain: "Votre convention est en attente de traitement" },
            { label: "Validée", explain: "Les points clés de votre convention ont été validés, elle sera prochainement envoyée à l'entreprise" },
            { label: "Envoyée à l'entreprise", explain: 'Votre convention a été envoyée à l\'entreprise, elle sera envoyée pour signature à l\'université dès son retour' }, 
            { label: "Signée par l'université", explain: 'Votre convention a été signée par l\'université, elle est en attente de téléchargement par vos soins.' }, 
            { label: "Terminée", explain: 'Merci !' }
        ];

        return (
            <Paper style={{ margin: 10, padding: 10 }}>
                {this.props.tracked && (
                    <ConventionPreview 
                        opened={this.state.preview} 
                        currentRow={this.props.tracked} 
                        activeTab={this.state.previewTab} 
                        isAdmin={false}
                        onCloseAction={this._handlePreviewClose}
                        onTableChange={this._handleTableChange}
                    />
                )}
                
                <Typography variant="headline" color="inherit">
                    Suivi de convention
                </Typography>
                <br />

                {this.props.tracked && (
                    <div>
                        <Typography variant="subheading" color="inherit">
                            {this.props.tracked.etudiant.nom + " " + this.props.tracked.etudiant.prenom}
                        </Typography>
                        <br />
                        <Button onClick={this._handlePreview} variant="raised" color='primary'>Prévisualiser</Button>
                        <br /><br />
                        <Typography key={steps[this.props.tracked.statut.status].label} variant="body1" color="inherit">
                            {steps[this.props.tracked.statut.status].explain}
                        </Typography>

                        <Stepper activeStep={this.props.tracked.statut.status} alternativeLabel={true}>
                            {steps.map(step => {
                                return (
                                <Step key={step.label}>
                                    <StepLabel>{step.label}</StepLabel>
                                </Step>
                                );
                            })}
                        </Stepper>
                    </div>
                )}

                {!this.props.tracked && (
                    <Typography variant="subheading" color="inherit">
                        Aucune convention trouvée
                    </Typography>)}
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