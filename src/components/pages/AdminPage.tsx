import axios from 'axios';
import * as React from 'react';

import { AppBar, Button, Dialog, Divider, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText, Slide, Switch, Tab, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, Tabs, TextField, Toolbar } from '@material-ui/core';
import Paper from '@material-ui/core/Paper/Paper';
import Typography from '@material-ui/core/Typography/Typography';
import CloseIcon from '@material-ui/icons/Close';
import { ListSubheader } from 'material-ui';

interface AdminPageState {
    page: number;
    rowsPerPage: number;
    apiURL: string | undefined;
    token: string | null;
    data: any[];
    rows: any[];
    preview: boolean;
    currentRow: any;
    previewTab: number;
}

// tslint:disable-next-line:no-empty-interface
interface AdminPageProps { }

function Transition(props: any) {
    return <Slide direction="up" {...props} />;
}

function TabContainer(props: any) {
    return (
      <Typography component="div">
        {props.children}
      </Typography>
    );
  }

export class AdminPage extends React.Component<AdminPageProps, AdminPageState> {
    constructor(props: AdminPageProps) {
        super(props);

        this.state = {
            page: 0,
            rowsPerPage: 25,
            apiURL: process.env.REACT_APP_API,
            token: sessionStorage.getItem('imsToken'),
            data: [],
            rows: [],
            preview: false,
            currentRow: null,
            previewTab: 0
        }

        this._handleChangePage = this._handleChangePage.bind(this);
        this._handleChangeRowsPerPage = this._handleChangeRowsPerPage.bind(this);
        this._handleSearch = this._handleSearch.bind(this);
        this._handleRowClick = this._handleRowClick.bind(this);
        this._handlePreviewClose = this._handlePreviewClose.bind(this);
        this._handleTableChange = this._handleTableChange.bind(this);
    }

    public async componentDidMount(){
        const request = await axios.get(this.state.apiURL + 'conventions/getAll', {
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
        }
    }

    public render() {
        return (
            <Paper style={{ margin: 10, padding: 10 }}>
            {this.state.currentRow ?
                <Dialog
                    fullScreen={true}
                    open={this.state.preview}
                    onClose={this._handlePreviewClose}
                    TransitionComponent={Transition}
                    >
                    <AppBar style={{position: 'relative'}}>
                        <Toolbar>
                            <IconButton color="inherit" onClick={this._handlePreviewClose} aria-label="Close">
                                <CloseIcon />
                            </IconButton>
                            <Typography variant="title" color="inherit">
                            { this.state.currentRow.etudiant.nom + " " + this.state.currentRow.etudiant.prenom }
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <Tabs value={this.state.previewTab} onChange={this._handleTableChange}>
                        <Tab label="Étudiant" />
                        <Tab label="Stage" />
                        <Tab label="Responsables" />
                        <Tab label="Entreprise" />
                        <Tab label="Extras" />
                        <Tab label="Actions" />
                    </Tabs>

                    {this.state.previewTab === 0 && 
                    <TabContainer>
                        <List>
                            <ListItem>
                                <ListItemText primary="Promotion" secondary={this.state.currentRow.etudiant.promotion} />
                            </ListItem>
                            <Divider />
                            <ListItem>
                                <ListItemText primary="Sexe" secondary={this.state.currentRow.etudiant.sexe} />
                            </ListItem>
                            <Divider />
                            <ListItem>
                                <ListItemText primary="Nom complet" secondary={this.state.currentRow.etudiant.nom + " " + this.state.currentRow.etudiant.prenom } />
                            </ListItem>
                            <Divider />
                            <ListItem>
                                <ListItemText primary="Sécurité sociale" secondary={this.state.currentRow.etudiant.securiteSociale} />
                            </ListItem>
                            <Divider />
                            <ListItem>
                                <ListItemText primary="Numéro étudiant" secondary={this.state.currentRow.etudiant.numeroEtudiant} />
                            </ListItem>
                            <Divider />
                            <ListItem>
                                <ListItemText primary="E-mail" secondary={this.state.currentRow.etudiant.email} />
                            </ListItem>
                            <Divider />
                            <ListItem>
                                <ListItemText primary="Date de naissance" secondary={this.state.currentRow.etudiant.dateNaissance} />
                            </ListItem>
                            <Divider />
                            <ListItem>
                                <ListItemText primary="Téléphone" secondary={this.state.currentRow.etudiant.telephone} />
                            </ListItem>
                            <Divider />
                            <ListItem>
                                <ListItemText primary="Adresse" secondary={this.state.currentRow.etudiant.adresse} />
                            </ListItem>
                            <Divider />
                            <ListItem>
                                <ListItemText primary="Assurance" secondary={this.state.currentRow.etudiant.assurance} />
                            </ListItem>
                            <Divider />
                            <ListItem>
                                <ListItemText primary="Numéro de police" secondary={this.state.currentRow.etudiant.numeroPolice} />
                            </ListItem>
                        </List>
                    </TabContainer>}
                    {this.state.previewTab === 1 && <TabContainer>
                        <List>
                            <ListItem>
                                <ListItemText primary="Intitulé" secondary={this.state.currentRow.stage.intituleStage} />
                            </ListItem>
                            <Divider />
                            <ListItem>
                                <ListItemText primary="Description" secondary={this.state.currentRow.stage.descriptionStage} />
                            </ListItem>
                            <Divider />
                            <ListItem>
                                <ListItemText primary="Date de début" secondary={this.state.currentRow.stage.dateDebutStage} />
                            </ListItem>
                            <Divider />
                            <ListItem>
                                <ListItemText primary="Date de fin" secondary={this.state.currentRow.stage.dateFinStage} />
                            </ListItem>
                            <Divider />
                            <ListItem>
                                <ListItemText primary="Durée hebdomadaire" secondary={this.state.currentRow.stage.dureeHebdoStage} />
                            </ListItem>
                            <Divider />
                            <ListItem>
                                <ListItemText primary="Horaires" secondary={this.state.currentRow.stage.horairesStage} />
                            </ListItem>
                            <Divider />
                            <ListItem>
                                <ListItemText primary="Présence les dimanche / jours fériés" secondary={this.state.currentRow.stage.presenceFree} />
                            </ListItem>
                            <Divider />
                            <ListItem>
                                <ListItemText primary="Gratification" secondary={this.state.currentRow.stage.gratificationStage} />
                            </ListItem>
                            <Divider />
                            <ListItem>
                                <ListItemText primary="Type de rémunération" secondary={this.state.currentRow.stage.typeRemuneration} />
                            </ListItem>
                            <Divider />
                            <ListItem>
                                <ListItemText primary="Avantages fournis" secondary={this.state.currentRow.stage.avantagesStage} />
                            </ListItem>
                            <Divider />
                        </List>
                    </TabContainer>}
                    {this.state.previewTab === 2 && 
                    <TabContainer>
                        <List>
                            <ListSubheader>Encadrant</ListSubheader>
                            <ListItem>
                                <ListItemText primary="Sexe" secondary={this.state.currentRow.responsables.sexeEncadrant} />
                            </ListItem>
                            <Divider />
                            <ListItem>
                                <ListItemText primary="Nom complet" secondary={this.state.currentRow.responsables.nomEncadrant + " " + this.state.currentRow.responsables.prenomEncadrant} />
                            </ListItem>
                            <Divider />
                            <ListItem>
                                <ListItemText primary="E-mail" secondary={this.state.currentRow.responsables.emailEncadrant} />
                            </ListItem>
                            <Divider />
                            <ListItem>
                                <ListItemText primary="Téléphone" secondary={this.state.currentRow.responsables.telephoneEncadrant} />
                            </ListItem>
                            <Divider />
                            <ListItem>
                                <ListItemText primary="Qualité" secondary={this.state.currentRow.responsables.qualiteEncadrant} />
                            </ListItem>
                            <Divider />
                            <ListSubheader>Tuteur</ListSubheader>
                            <ListItem>
                                <ListItemText primary="Sexe" secondary={this.state.currentRow.responsables.sexeTuteur} />
                            </ListItem>
                            <Divider />
                            <ListItem>
                                <ListItemText primary="Nom complet" secondary={this.state.currentRow.responsables.nomTuteur + " " + this.state.currentRow.responsables.prenomTuteur} />
                            </ListItem>
                            <Divider />
                            <ListItem>
                                <ListItemText primary="E-mail" secondary={this.state.currentRow.responsables.emailTuteur} />
                            </ListItem>
                            <Divider />
                            <ListItem>
                                <ListItemText primary="Téléphone" secondary={this.state.currentRow.responsables.telephoneTuteur} />
                            </ListItem>
                            <Divider />
                            <ListItem>
                                <ListItemText primary="Qualité" secondary={this.state.currentRow.responsables.qualiteTuteur} />
                            </ListItem>
                            <Divider />
                        </List>
                    </TabContainer>}
                    {this.state.previewTab === 3 &&
                    <TabContainer>
                        <List>
                            <ListItem>
                                <ListItemText primary="Nom" secondary={this.state.currentRow.entreprise.nomEntreprise} />
                            </ListItem>
                            <Divider />
                            <ListItem>
                                <ListItemText primary="Site web" secondary={this.state.currentRow.entreprise.siteWebEntreprise} />
                            </ListItem>
                            <Divider />
                            <ListItem>
                                <ListItemText primary="Siège" secondary={this.state.currentRow.entreprise.siegeEntreprise} />
                            </ListItem>
                            <Divider />
                            <ListItem>
                                <ListItemText primary="Adresse" secondary={this.state.currentRow.entreprise.adrEntreprise} />
                            </ListItem>
                            <Divider />
                            <ListSubheader>Représentant</ListSubheader>
                            <ListItem>
                                <ListItemText primary="Sexe" secondary={this.state.currentRow.entreprise.sexeRepresentant} />
                            </ListItem>
                            <Divider />
                            <ListItem>
                                <ListItemText primary="Nom complet" secondary={this.state.currentRow.entreprise.nomRepresentant} />
                            </ListItem>
                            <Divider />
                            <ListItem>
                                <ListItemText primary="E-mail" secondary={this.state.currentRow.entreprise.emailRepresentant} />
                            </ListItem>
                            <Divider />
                            <ListItem>
                                <ListItemText primary="Téléphone" secondary={this.state.currentRow.entreprise.telephoneRepresentant} />
                            </ListItem>
                            <Divider />
                            <ListItem>
                                <ListItemText primary="Qualité" secondary={this.state.currentRow.entreprise.qualiteRepresentant} />
                            </ListItem>
                            <Divider />
                        </List>
                    </TabContainer>
                    }
                    {this.state.previewTab === 4 && 
                    <TabContainer>
                        <List>
                            <ListItem>
                                <ListItemText primary="Informations supplémentaires" secondary={this.state.currentRow.extras.complementaires} />
                            </ListItem>
                            <Divider />
                        </List>
                    </TabContainer>}
                    {this.state.previewTab === 5 && 
                    <TabContainer>
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
                                <ListItemText primary="Supprimer la demande" secondary="Supprime la demande de la base de données" />
                            </ListItem>
                            <Divider />
                        </List>
                        <List>
                            <ListSubheader>Statut</ListSubheader>
                            <ListItem>
                                <ListItemText primary="Validée" />
                                <ListItemSecondaryAction>
                                    <Switch checked={this.state.currentRow.statut.status >= 1 ? true : false }
                                            disabled={this.state.currentRow.statut.status > 1 ? true : false } />
                                </ListItemSecondaryAction>
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Envoyée à l'entreprise" />
                                <ListItemSecondaryAction>
                                    <Switch checked={this.state.currentRow.statut.status >= 2 ? true : false } 
                                            disabled={this.state.currentRow.statut.status > 2 ? true : false } />
                                </ListItemSecondaryAction>
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Signée par l'université" />
                                <ListItemSecondaryAction>
                                    <Switch checked={this.state.currentRow.statut.status >= 3 ? true : false } 
                                            disabled={this.state.currentRow.statut.status > 3 ? true : false } />
                                </ListItemSecondaryAction>
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Terminée" />
                                <ListItemSecondaryAction>
                                    <Switch checked={this.state.currentRow.statut.status >= 4 ? true : false }
                                            disabled={this.state.currentRow.statut.status > 4 ? true : false } />
                                </ListItemSecondaryAction>
                            </ListItem>
                        </List>
                        <Button style={{float: 'right'}} color="primary">Mettre à jour</Button>
                    </TabContainer>}
                </Dialog> : null }
                <Typography variant="title" color="inherit">
                    Administration
                </Typography>
                <br />
                <TextField onChange={this._handleSearch} fullWidth={true} label="Trier" />
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Étudiant</TableCell>
                            <TableCell>Entreprise</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>Statut</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.data.slice(this.state.page * this.state.rowsPerPage,
                            this.state.page * this.state.rowsPerPage + this.state.rowsPerPage)
                            .map(n => {
                                return (
                                    <TableRow key={n.rowId} onClick={this._handleRowClick}>
                                        <TableCell id={n.rowId}>{n.etudiant}</TableCell>
                                        <TableCell id={n.rowId}>{n.entreprise}</TableCell>
                                        <TableCell id={n.rowId}>{n.type === 'france' ? 'Stage en France' : 'Stage à l\'étranger'}</TableCell>
                                        <TableCell id={n.rowId}>{n.statut}</TableCell>
                                    </TableRow>
                                );
                            })
                        }
                    </TableBody>
                </Table>
                <TablePagination
                    component="div"
                    count={this.state.data.length}
                    labelRowsPerPage='Lignes par page'
                    rowsPerPage={this.state.rowsPerPage}
                    page={this.state.page}
                    backIconButtonProps={{
                        'aria-label': 'Précédent',
                    }}
                    nextIconButtonProps={{
                        'aria-label': 'Suivant',
                    }}
                    onChangePage={this._handleChangePage}
                    onChangeRowsPerPage={this._handleChangeRowsPerPage}
                />
            </Paper>
        );
    }

    private _handleChangePage(event: any, page: any) {
        this.setState({ page });
    }

    private _handleChangeRowsPerPage(event: any) {
        this.setState({ rowsPerPage: event.target.value });
    }

    private _handlePreviewClose(event: any) {
        this.setState({preview: false});
    }

    private _handleSearch(event: any) {
        console.log('search', event.target.value);
    }

    private _handleRowClick(event: any) {
        const target = this.state.rows.find((row: any) => {
            if(row.id === event.target.id){
                return row;
            }
        });

        if(target){
            this.setState({currentRow: target, preview: true, previewTab: 0});
        }
    }

    private _handleTableChange(event: any, value: any) {
        this.setState({previewTab: value});
    }

    private createData(entreprise: string, etudiant: string, statut: string, rowId: string, type: string) {
        return { entreprise, etudiant, statut, rowId, type };
    }
}