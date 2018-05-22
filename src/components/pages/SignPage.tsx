import axios from 'axios';
import * as React from 'react';
import SignaturePad from 'react-signature-pad-wrapper'

import Button from '@material-ui/core/Button/Button';
import Dialog from '@material-ui/core/Dialog/Dialog';
import DialogActions from '@material-ui/core/DialogActions/DialogActions';
import DialogContent from '@material-ui/core/DialogContent/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle/DialogTitle';
import FormControl from '@material-ui/core/FormControl/FormControl';
import Input from '@material-ui/core/Input/Input';
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import Paper from '@material-ui/core/Paper/Paper';
import Snackbar, { SnackBarOrigin } from '@material-ui/core/Snackbar/Snackbar';
import Typography from '@material-ui/core/Typography/Typography';
import Save from '@material-ui/icons/Save';

import ConventionPreview from '../ConventionPreview';

import { makeSignersDatasource } from '../../utils/string';

interface SignPageState {
    apiURL: string | undefined;
    preview: boolean;
    signing: boolean;
    confirm: boolean;
    previewTab: number;
    image: string | undefined;
    done: boolean;
    currentCity: string;
    currentSignatory: string;
    snackHorizontal: SnackBarOrigin["horizontal"] | undefined;
    snackOpen: boolean;
    snackMessage: string;
}

interface SignPageProps {
    signed: any;
    for: string | undefined;
    isSigned: boolean;
    isCeremonyComplete: boolean;
    onSigningDone: (any);
}

export class SignPage extends React.Component<SignPageProps, SignPageState> {
    private signaturePad: any;

    constructor(props: SignPageProps) {
        super(props);

        this.state = {
            apiURL: process.env.REACT_APP_API,
            preview: false,
            signing: false,
            confirm: false,
            done: false,
            previewTab: 0,
            image: undefined,
            currentCity: '',
            currentSignatory: '',
            snackOpen: false,
            // tslint:disable-next-line:no-bitwise
            snackHorizontal: 'right',
            snackMessage: ''
        }

        this._handlePreview = this._handlePreview.bind(this);
        this._handlePreviewClose = this._handlePreviewClose.bind(this);
        this._handleTableChange = this._handleTableChange.bind(this);
        this._handleConfirm = this._handleConfirm.bind(this);
        this._handleConfirmChange = this._handleConfirmChange.bind(this);
        this._handleSign = this._handleSign.bind(this);
        this._handleClear = this._handleClear.bind(this);
        this._handleSnackClose = this._handleSnackClose.bind(this);
        this._downloadConvention = this._downloadConvention.bind(this);
    }

    public async componentDidMount(){
        this.setState({done: Boolean(this.props.isSigned)})
    }

    public render() {
        const signersState = makeSignersDatasource(this.props.signed);
        const lines = [];
        // tslint:disable-next-line:forin
        for (const signer in signersState) {
            const him = signersState[signer];
            lines.push({
                key: signer,
                crappy: him.crappy,
                done: him.done
            });
        }
        
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

                {this.props.isCeremonyComplete && (
                    <Typography variant="headline" color="inherit">
                        Récupération de la convention
                    </Typography>
                )}
                
                {!this.props.isCeremonyComplete && (
                    <Typography variant="headline" color="inherit">
                        Signature de convention
                    </Typography>
                )}

                <br />
                {!this.props.isCeremonyComplete && this.props.signed && (
                    <div>
                        <Typography variant="subheading" color="inherit">
                            Partie : {this.props.for}<br />
                            Étudiant : {this.props.signed.etudiant.nom + " " + this.props.signed.etudiant.prenom}<br />
                        </Typography>
                        <br />                       
                        {!this.state.done && (<Typography variant="body1" color="inherit">
                            Une fois validée, une preuve de signature contenant les informations de base de la convention vous sera fournie.<br />
                            Vous pourrez télécharger la convention quand elle aura été signée par toutes les parties.<br />
                            Votre signature est supprimée une fois la convention générée.
                        </Typography>)}
                        {this.state.done && (<Typography variant="body1" color="inherit">
                            Votre signature a été inscrite, vous pourrez télécharger la convention ici quand toutes les parties auront signé.
                        </Typography>)}
                        <br />
                        <Button onClick={this._handlePreview} variant="raised" color='primary'>Prévisualiser la convention</Button>
                        <Button onClick={this._handleConfirm} variant="raised" color='primary' style={{float: 'right'}} disabled={this.state.done || Boolean(this.props.isSigned)}>Valider la signature</Button>                        
                        <div style={{clear: 'both', marginTop: 10}} />
                        {!this.state.done && (
                            <div style={{float: 'right'}}>
                                <Typography variant="subheading" color="inherit">
                                    Signez ci-dessous
                                </Typography>
                                <div style={{border: '1px dashed black', width: 350, height: 200}}>
                                    <SignaturePad ref={(ref: any) => this.signaturePad = ref}/>
                                </div>
                                <Button onClick={this._handleClear} color='primary' style={{float: 'right'}}>Vider la zone</Button> 
                            </div>
                        )}
                        <br /> 
                        <Typography variant="subheading" color="inherit">
                            Statut des parties : <br />
                            <ul>
                                {lines.map((line: any, idx: number) => {
                                    return <li key={idx}>{line.crappy} {line.done ? 'signée' : 'en attente'}</li>;
                                })}
                            </ul>
                        </Typography>
                        
                        <div style={{clear: 'both'}} />
                        <Dialog
                            open={this.state.confirm}
                            onClose={this._handlePreviewClose}
                            >
                            <DialogTitle>
                                Êtes-vous sûr ?
                            </DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    <FormControl required={true} error={false}>
                                        <InputLabel htmlFor="currentSignatory">Nom complet</InputLabel>
                                        <Input
                                            id="currentSignatory"
                                            value={this.state.currentSignatory}
                                            onChange={this._handleConfirmChange}
                                        />
                                    </FormControl>
                                    <FormControl required={true} error={false}>
                                        <InputLabel htmlFor="currentCity">Ville actuelle</InputLabel>
                                        <Input
                                            id="currentCity"
                                            value={this.state.currentCity}
                                            onChange={this._handleConfirmChange}
                                        />
                                    </FormControl>
                                    <br />
                                    En signant, vous consentez à cette convention de stage.<br /><br />
                                    Prévisualisation : <br />
                                    <img style={{width: 350, height: 200}} src={this.state.image} />
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={this._handlePreviewClose} color="primary">
                                    Annuler
                                </Button>
                                <Button onClick={this._handleSign} color="primary">
                                    Signer
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </div>
                )}

                {!this.props.isCeremonyComplete && !this.props.signed && (
                    <Typography variant="subheading" color="inherit">
                        Aucune convention trouvée
                    </Typography>)}

                {this.props.isCeremonyComplete && (
                    <div>
                        <Typography variant="subheading" color="inherit">
                            Partie : {this.props.for}<br />
                            Étudiant : {this.props.signed.etudiant.nom + " " + this.props.signed.etudiant.prenom}
                        </Typography>
                        <br /> <br />
                        <Typography variant="subheading" color="inherit">
                            Le processus de signature a été complété, vous pouvez télécharger votre document dès maintenant.
                        </Typography>
                        <Button variant="raised" size="medium" color="primary" style={{float: 'right'}} onClick={this._downloadConvention}>
                                <Save /> Télécharger
                        </Button>
                        <div style={{clear: 'both'}} />
                    </div>
                )}
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: this.state.snackHorizontal,
                    }}
                    open={this.state.snackOpen}
                    autoHideDuration={6000}
                    onClose={this._handleSnackClose}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">{this.state.snackMessage}</span>}
                />
            </Paper>
        );
    }

    private _handleSnackClose(event: any) {
        this.setState({snackOpen: false});
    }

    private _handleConfirm(event: any) {
        this.setState({image: this.signaturePad.toDataURL(), confirm: true});
    }

    private _handleConfirmChange(event: any) {
        this.setState({[event.target.id]: event.target.value});
    }

    private _handleClear(event: any) {
        this.signaturePad.clear();
    }

    private async _downloadConvention(event: any) {
        try {
            this.setState({snackOpen: true, snackMessage: 'Récupération en cours'});

            const generate = await axios.post(this.state.apiURL + 'conventions/generate/' + this.props.signed.id, null, { 
                responseType: 'blob'
            });
            const url = window.URL.createObjectURL(new Blob([generate.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'convention-' + this.props.signed.id + '.pdf');
            document.body.appendChild(link);
            link.click();
            this.setState({snackOpen: true, snackMessage: 'Récupérée avec succès !'});
        } catch (error) {
            this.setState({snackOpen: true, snackMessage: 'Erreur pendant la récupération'});
        }
    }

    private async _handleSign(event: any) {
        try {
            const proof = await axios.post(this.state.apiURL + 'signlinks/fill/' + this._getShortId(), {
                name: this.state.currentSignatory,
                location: this.state.currentCity,
                data: this.signaturePad.toDataURL()
            },
            {
                responseType: 'arraybuffer',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/pdf'
                }
            });

            const url = window.URL.createObjectURL(new Blob([proof.data], {type: 'application/pdf'}));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', this.props.for + '-signature.pdf');
            document.body.appendChild(link);
            link.click();
            window.URL.revokeObjectURL(url);
            link.remove();

            this.setState({confirm: false, snackOpen: true, snackMessage: 'Signé avec succès !', done: true});
            this.props.onSigningDone(this._getShortId());
        } catch (error) {
            this.setState({confirm: true, snackOpen: true, snackMessage: 'Erreur pendant la signature, merci de réessayer'});
        }
    }

    private _handlePreview(event: any){
        this.setState({preview: true, confirm: false});
    }

    private _handlePreviewClose(event: any) {
        this.setState({preview: false, confirm: false});
    }

    private _handleTableChange(event: any, value: any) {
        this.setState({previewTab: value});
    }

    private _getShortId(){
        const currentURL = window.location.pathname;
        const lastPart = currentURL.match(/([^\/]*)\/*$/);
        if(lastPart){
          return lastPart[1];
        }

        return null;
    }
}