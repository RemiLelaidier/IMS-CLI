import * as React from 'react';

import AppBar from '@material-ui/core/AppBar/AppBar';
import Dialog from '@material-ui/core/Dialog/Dialog';
import Divider from '@material-ui/core/Divider/Divider';
import IconButton from '@material-ui/core/IconButton/IconButton';
import List from '@material-ui/core/List/List';
import ListItem from '@material-ui/core/ListItem/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText/ListItemText';
import Slide from '@material-ui/core/Slide/Slide';
import Switch from '@material-ui/core/Switch/Switch';
import Tab from '@material-ui/core/Tab/Tab';
import Tabs from '@material-ui/core/Tabs/Tabs';
import TextField from '@material-ui/core/TextField/TextField';
import Toolbar from '@material-ui/core/Toolbar/Toolbar';
import Typography from '@material-ui/core/Typography/Typography';
import CloseIcon from '@material-ui/icons/Close';
import { ListSubheader } from 'material-ui';

// tslint:disable-next-line:no-empty-interface
interface ConventionPreviewState {
}

interface ConventionPreviewProps {
    opened: boolean;
    currentRow: any;
    activeTab: number;
    isAdmin: boolean;
    onCloseAction: (any);
    onTableChange: (any);
    onAction: (any);
}

function TabContainer(props: any) {
    return (
      <Typography component="div">
        {props.children}
      </Typography>
    );
}

function Transition(props: any) {
    return <Slide direction="up" {...props} />;
}

export default class ConventionPreview extends React.Component<ConventionPreviewProps, ConventionPreviewState> {
    public schema: any;

    constructor(props: ConventionPreviewProps) {
        super(props);
        this.state = {};
        this._handleCloseAction = this._handleCloseAction.bind(this);
        this._handleTableChange = this._handleTableChange.bind(this);
        this._handleSwitch = this._handleSwitch.bind(this);
    }

    public render() {
        if(!this.props.currentRow){
            return (null);
        }
        return (
                <Dialog
                    fullScreen={true}
                    open={this.props.opened}
                    onClose={this._handleCloseAction}
                    TransitionComponent={Transition}
                >
                <AppBar style={{position: 'relative'}}>
                    <Toolbar>
                        <IconButton color="inherit" onClick={this._handleCloseAction} aria-label="Close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="title" color="inherit">
                        { this.props.currentRow.etudiant.nom + " " + this.props.currentRow.etudiant.prenom }
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Tabs value={this.props.activeTab} onChange={this._handleTableChange}>
                    <Tab label="Étudiant" />
                    <Tab label="Stage" />
                    <Tab label="Responsables" />
                    <Tab label="Entreprise" />
                    {this.props.currentRow.extras && <Tab label="Extras" />}
                    {this.props.isAdmin && <Tab label="Actions" />}
                    {/*!this.props.isAdmin && <Tab label="Suivi" value={5} />*/}
                </Tabs>

                {this.props.activeTab === 0 && 
                <TabContainer>
                    <List>
                        <ListItem>
                            <ListItemText primary="Promotion" secondary={this.props.currentRow.etudiant.promotion} />
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <ListItemText primary="Sexe" secondary={this.props.currentRow.etudiant.sexe} />
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <ListItemText primary="Nom complet" secondary={this.props.currentRow.etudiant.nom + " " + this.props.currentRow.etudiant.prenom } />
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <ListItemText primary="Sécurité sociale" secondary={this.props.currentRow.etudiant.securiteSociale} />
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <ListItemText primary="Numéro étudiant" secondary={this.props.currentRow.etudiant.numeroEtudiant} />
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <ListItemText primary="E-mail" secondary={this.props.currentRow.etudiant.email} />
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <ListItemText primary="Date de naissance" secondary={this.props.currentRow.etudiant.dateNaissance} />
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <ListItemText primary="Téléphone" secondary={this.props.currentRow.etudiant.telephone} />
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <ListItemText primary="Adresse" secondary={this.props.currentRow.etudiant.adresse} />
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <ListItemText primary="Assurance" secondary={this.props.currentRow.etudiant.assurance} />
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <ListItemText primary="Numéro de police" secondary={this.props.currentRow.etudiant.numeroPolice} />
                        </ListItem>
                    </List>
                </TabContainer>}
                {this.props.activeTab === 1 && <TabContainer>
                    <List>
                        <ListItem>
                            <ListItemText primary="Intitulé" secondary={this.props.currentRow.stage.intituleStage} />
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <ListItemText primary="Description" secondary={this.props.currentRow.stage.descriptionStage} />
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <ListItemText primary="Date de début" secondary={this.props.currentRow.stage.dateDebutStage} />
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <ListItemText primary="Date de fin" secondary={this.props.currentRow.stage.dateFinStage} />
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <ListItemText primary="Durée hebdomadaire" secondary={this.props.currentRow.stage.dureeHebdoStage} />
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <ListItemText primary="Horaires" secondary={this.props.currentRow.stage.horairesStage} />
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <ListItemText primary="Présence les dimanche / jours fériés" secondary={this.props.currentRow.stage.presenceFree} />
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <ListItemText primary="Gratification" secondary={this.props.currentRow.stage.gratificationStage} />
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <ListItemText primary="Type de rémunération" secondary={this.props.currentRow.stage.typeRemuneration} />
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <ListItemText primary="Avantages fournis" secondary={this.props.currentRow.stage.avantagesStage} />
                        </ListItem>
                        <Divider />
                    </List>
                </TabContainer>}
                {this.props.activeTab === 2 && 
                <TabContainer>
                    <List>
                        <ListSubheader>Encadrant</ListSubheader>
                        <ListItem>
                            <ListItemText primary="Sexe" secondary={this.props.currentRow.responsables.sexeEncadrant} />
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <ListItemText primary="Nom complet" secondary={this.props.currentRow.responsables.nomEncadrant + " " + this.props.currentRow.responsables.prenomEncadrant} />
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <ListItemText primary="E-mail" secondary={this.props.currentRow.responsables.emailEncadrant} />
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <ListItemText primary="Téléphone" secondary={this.props.currentRow.responsables.telephoneEncadrant} />
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <ListItemText primary="Qualité" secondary={this.props.currentRow.responsables.qualiteEncadrant} />
                        </ListItem>
                        <Divider />
                        <ListSubheader>Tuteur</ListSubheader>
                        <ListItem>
                            <ListItemText primary="Sexe" secondary={this.props.currentRow.responsables.sexeTuteur} />
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <ListItemText primary="Nom complet" secondary={this.props.currentRow.responsables.nomTuteur + " " + this.props.currentRow.responsables.prenomTuteur} />
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <ListItemText primary="E-mail" secondary={this.props.currentRow.responsables.emailTuteur} />
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <ListItemText primary="Téléphone" secondary={this.props.currentRow.responsables.telephoneTuteur} />
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <ListItemText primary="Qualité" secondary={this.props.currentRow.responsables.qualiteTuteur} />
                        </ListItem>
                        <Divider />
                    </List>
                </TabContainer>}
                {this.props.activeTab === 3 &&
                <TabContainer>
                    <List>
                        <ListItem>
                            <ListItemText primary="Nom" secondary={this.props.currentRow.entreprise.nomEntreprise} />
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <ListItemText primary="Site web" secondary={this.props.currentRow.entreprise.siteWebEntreprise} />
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <ListItemText primary="Siège" secondary={this.props.currentRow.entreprise.siegeEntreprise} />
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <ListItemText primary="Adresse" secondary={this.props.currentRow.entreprise.adrEntreprise} />
                        </ListItem>
                        <Divider />
                        <ListSubheader>Représentant</ListSubheader>
                        <ListItem>
                            <ListItemText primary="Sexe" secondary={this.props.currentRow.entreprise.sexeRepresentant} />
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <ListItemText primary="Nom complet" secondary={this.props.currentRow.entreprise.nomRepresentant} />
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <ListItemText primary="E-mail" secondary={this.props.currentRow.entreprise.emailRepresentant} />
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <ListItemText primary="Téléphone" secondary={this.props.currentRow.entreprise.telephoneRepresentant} />
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <ListItemText primary="Qualité" secondary={this.props.currentRow.entreprise.qualiteRepresentant} />
                        </ListItem>
                        <Divider />
                    </List>
                </TabContainer>
                }
                {this.props.currentRow.extras && this.props.activeTab === 4 && 
                <TabContainer>
                    <List>
                        <ListItem>
                            <ListItemText primary="Informations supplémentaires" secondary={this.props.currentRow.extras.complementaires} />
                        </ListItem>
                        <Divider />
                    </List>
                </TabContainer>}
                {this.props.activeTab === 5 && 
                <TabContainer>
                    {this.props.isAdmin && (
                    <List>
                        <ListSubheader>Suivi</ListSubheader>
                        <ListItem>
                            {/* TODO : Add comment system here */}
                            <TextField label="Notes internes" placeholder="Information de suivi, déroulement.." fullWidth={true} />
                        </ListItem>
                        <ListSubheader>Actions rapides</ListSubheader>
                        <ListItem button={true}>
                            <ListItemText primary="Générer la convention" secondary="Génère la convention remplie" />
                        </ListItem>
                        <ListItem button={true} color='red'>
                            <ListItemText primary="Annuler la demande" secondary="Annule la demande, l'étudiant est tenu au courant sur son suivi" />
                        </ListItem>
                        <ListItem button={true} color='red'>
                            <ListItemText primary="Supprimer la demande" secondary="Supprime complètement la demande" />
                        </ListItem>
                        <Divider />
                    </List>)}
                    <List>
                        <ListSubheader>Statut</ListSubheader>
                        <ListItem>
                            <ListItemText primary="Validée" />
                            <ListItemSecondaryAction>
                                <Switch id="1"
                                        onClick={this._handleSwitch}
                                        checked={this.props.currentRow.statut.status >= 1 ? true : false }
                                        disabled={!this.props.isAdmin || this.props.currentRow.statut.status > 1 ? true : false } />
                            </ListItemSecondaryAction>
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Envoyée à l'entreprise" />
                            <ListItemSecondaryAction>
                                <Switch id="2"
                                        onClick={this._handleSwitch}
                                        checked={this.props.currentRow.statut.status >= 2 ? true : false } 
                                        disabled={!this.props.isAdmin || this.props.currentRow.statut.status > 2 ? true : false } />
                            </ListItemSecondaryAction>
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Signée par l'université" />
                            <ListItemSecondaryAction>
                                <Switch id="3"
                                        onClick={this._handleSwitch}
                                        checked={this.props.currentRow.statut.status >= 3 ? true : false } 
                                        disabled={!this.props.isAdmin || this.props.currentRow.statut.status > 3 ? true : false } />
                            </ListItemSecondaryAction>
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Terminée" />
                            <ListItemSecondaryAction>
                                <Switch id="4"
                                        onClick={this._handleSwitch}
                                        checked={this.props.currentRow.statut.status >= 4 ? true : false }
                                        disabled={!this.props.isAdmin || this.props.currentRow.statut.status > 4 ? true : false } />
                            </ListItemSecondaryAction>
                        </ListItem>
                    </List>
                </TabContainer>}
            </Dialog>);
    }

    private _handleSwitch(event: any){
        let statusIndex = parseInt(event.target.id, 10);
        if(statusIndex === this.props.currentRow.statut.status) {
            statusIndex = statusIndex - 1;
        }
        this.props.onAction(statusIndex);
    }

    private _handleCloseAction(event: any){
        this.props.onCloseAction(event);
    }

    private _handleTableChange(event: any, value: any) {
        this.props.onTableChange(event, value);
    }
}