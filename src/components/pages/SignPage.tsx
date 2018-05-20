import * as React from 'react';
import SignaturePad from 'react-signature-pad-wrapper'

import Button from '@material-ui/core/Button/Button';
import Paper from '@material-ui/core/Paper/Paper';
import Typography from '@material-ui/core/Typography/Typography';

import ConventionPreview from '../ConventionPreview';

interface SignPageState {
    apiURL: string | undefined;
    preview: boolean;
    signing: boolean;
    previewTab: number;
}

interface SignPageProps {
    signed: any;
    for: string;
}

export class SignPage extends React.Component<SignPageProps, SignPageState> {
    private signaturePad: any;

    constructor(props: SignPageProps) {
        super(props);

        this.state = {
            apiURL: process.env.REACT_APP_API,
            preview: false,
            signing: false,
            previewTab: 0
        }

        this._handlePreview = this._handlePreview.bind(this);
        this._handlePreviewClose = this._handlePreviewClose.bind(this);
        this._handleTableChange = this._handleTableChange.bind(this);
        this._handleSign = this._handleSign.bind(this);
    }

    public async componentDidMount(){
        console.log('signing', this.props.signed);
    }

    public render() {
        return (
            <Paper style={{ margin: 10, padding: 10 }}>
                {this.props.signed && (
                    <ConventionPreview 
                        opened={this.state.preview} 
                        currentRow={this.props.signed} 
                        activeTab={this.state.previewTab} 
                        isAdmin={false}
                        onCloseAction={this._handlePreviewClose}
                        onTableChange={this._handleTableChange}
                        onAction={null}
                    />
                )}
                
                <Typography variant="headline" color="inherit">
                    Signature de convention
                </Typography>
                <br />

                {this.props.signed && (
                    <div>
                        <Typography variant="subheading" color="inherit">
                            Partie : {this.props.for}<br />
                            Étudiant : {this.props.signed.etudiant.nom + " " + this.props.signed.etudiant.prenom}
                        </Typography>
                        <br />                       
                        <Typography variant="body1" color="inherit">
                            Une fois validée, une preuve de signature contenant les informations de base de la convention vous sera fournie.<br />
                            Vous pourrez télécharger la convention quand elle aura été signée par toutes les parties.<br />
                            Votre signature est supprimée une fois la convention générée.
                        </Typography>
                        <br />
                        <Button onClick={this._handlePreview} variant="raised" color='primary'>Prévisualiser la convention</Button>
                        <Button onClick={this._handleSign} variant="raised" color='primary' style={{float: 'right'}}>Valider la signature</Button>
                        <br /> <br />
                        <Typography variant="subheading" color="inherit">
                            Signez ci-dessous :
                        </Typography>
                        <div style={{border: '1px dashed black'}}>
                            <SignaturePad ref={(ref: any) => this.signaturePad = ref} />
                        </div>
                    </div>
                )}

                {!this.props.signed && (
                    <Typography variant="subheading" color="inherit">
                        Aucune convention trouvée
                    </Typography>)}
            </Paper>
        );
    }

    private _handleSign(event: any) {
        console.log(this.signaturePad.toDataURL());
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