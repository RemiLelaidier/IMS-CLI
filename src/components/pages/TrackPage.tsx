// import axios from 'axios';
import * as React from 'react';

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

// tslint:disable-next-line:no-empty-interface
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

        this._handlePreviewClose = this._handlePreviewClose.bind(this);
        this._handleTableChange = this._handleTableChange.bind(this);
    }

    public async componentDidMount(){
        // todo get with url param (through app ?)
        /*const request = await axios.get(this.state.apiURL + 'conventions/getAll', {
            headers: {
                Authorization: this.state.token
            }
        });
        
        if(request.status === 200){
            const conventions = request.data.data;
            const rows: any[] = [];
            conventions.forEach((convention: any, idx: number) => {
                const row = this.createData(convention.entreprise.nomEntreprise, convention.etudiant.nom, convention.statut.nom, convention.id, convention.type.name);
                rows.push(row);
            });
            this.setState({data:rows, rows: conventions});
        } else {
            console.log('erf');
        }*/
    }

    public render() {
        const steps = ["Soumise", "Validée", "Envoyée à l'entreprise", "Signée par l'université", "Terminée"]
        return (
            <Paper style={{ margin: 10, padding: 10 }}>
                <ConventionPreview 
                    opened={this.state.preview} 
                    currentRow={this.props.tracked} 
                    activeTab={this.state.previewTab} 
                    isAdmin={true}
                    onCloseAction={this._handlePreviewClose}
                    onTableChange={this._handleTableChange}
                />
                <Typography variant="title" color="inherit">
                    Suivi
                </Typography>
                <Stepper activeStep={0} alternativeLabel={true}>
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

    private _handlePreviewClose(event: any) {
        this.setState({preview: false});
    }

    private _handleTableChange(event: any, value: any) {
        this.setState({previewTab: value});
    }
}