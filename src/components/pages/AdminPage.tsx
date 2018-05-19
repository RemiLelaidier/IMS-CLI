import axios from 'axios';
import * as React from 'react';

import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, TextField  } from '@material-ui/core';
import Paper from '@material-ui/core/Paper/Paper';
import Typography from '@material-ui/core/Typography/Typography';
import ConventionPreview from '../ConventionPreview';

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
    statusList: any[];
    snackOpen: boolean;
    snackMessage: string;
    snackHorizontal: number | "left" | "center" | "right" | undefined;
    dialogOpen: false;
    dialogTitle: string | null;
    dialogMessage: string | null;
    dialogAction: (any);
}

// tslint:disable-next-line:no-empty-interface
interface AdminPageProps { }

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
            previewTab: 0,
            statusList: [],
            snackOpen: false,
            snackMessage: '',
            snackHorizontal: 'right',
            dialogOpen: false,
            dialogAction: null,
            dialogMessage: null,
            dialogTitle: null
        }

        this._handleChangePage = this._handleChangePage.bind(this);
        this._handleChangeRowsPerPage = this._handleChangeRowsPerPage.bind(this);
        this._handleSearch = this._handleSearch.bind(this);
        this._handleRowClick = this._handleRowClick.bind(this);
        this._handlePreviewClose = this._handlePreviewClose.bind(this);
        this._handleTableChange = this._handleTableChange.bind(this);
        this._handlePreviewAction = this._handlePreviewAction.bind(this);
        this._loadConventions = this._loadConventions.bind(this);
        this._loadStatusList = this._loadStatusList.bind(this);
        this._handleSnackClose = this._handleSnackClose.bind(this);
        this._updateCurrentRow = this._updateCurrentRow.bind(this);
        this._handleDialogClose = this._handleDialogClose.bind(this);
    }

    public async componentDidMount(){
        await this._loadConventions();
        await this._loadStatusList();
    }

    public render() {
        return (
            <Paper style={{ margin: 10, padding: 10 }}>
                <ConventionPreview 
                    opened={this.state.preview} 
                    currentRow={this.state.currentRow} 
                    activeTab={this.state.previewTab} 
                    isAdmin={true}
                    onCloseAction={this._handlePreviewClose}
                    onTableChange={this._handleTableChange}
                    onAction={this._handlePreviewAction}
                />
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
                <Dialog onClose={this._handleDialogClose} open={this.state.dialogOpen}>
                    <DialogTitle>{this.state.dialogTitle}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                        {this.state.dialogMessage}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this._handleDialogClose} color="primary">
                        Annuler
                        </Button>
                        <Button onClick={this.state.dialogAction} color="primary" autoFocus={true}>
                        Continuer
                        </Button>
                    </DialogActions>
                </Dialog>
            </Paper>
            
        );
    }

    private _handleSnackClose(event: any) {
        this.setState({snackOpen: false});
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

    private _handleDialogClose(event: any) {
        this.setState({dialogOpen: false});
    }

    private async _handlePreviewAction(statusIdOrAction: any, rowId: any){
        if(rowId) {
            switch(statusIdOrAction){
                case 'generate':
                    this.setState({snackOpen: true, snackMessage: 'Génération en cours', snackHorizontal: 'right'});
                    try {
                        const generate = await axios.post(this.state.apiURL + 'conventions/generate/' + this.state.currentRow.id, null, { 
                            headers: {
                                Authorization: this.state.token
                            },
                            responseType: 'blob'
                        });
                        this.setState({snackOpen: true, snackMessage: 'Convention générée avec succès', snackHorizontal: 'right'});
                        const url = window.URL.createObjectURL(new Blob([generate.data]));
                        const link = document.createElement('a');
                        link.href = url;
                        link.setAttribute('download', this.state.currentRow.etudiant.nom + '-convention.pdf');
                        document.body.appendChild(link);
                        link.click();
                    } catch (error) {
                        this.setState({snackOpen: true, snackMessage: 'Erreur pendant la génération', snackHorizontal: 'right'});
                    }

                    return;
                case 'cancel':
                    this.setState({snackOpen: true, snackMessage: 'Annulation de la convention', snackHorizontal: 'right'});
                    const cancelled = this.state.statusList.filter((status: any) => {
                        if(status.status === 5){
                            return true;
                        }
                        return false;
                    })
                    try {
                        await axios.post(this.state.apiURL + 'conventions/update/' + this.state.currentRow.id, {
                            statutId: cancelled[0].id
                        }, { 
                            headers: {
                                Authorization: this.state.token
                            }
                        });
                    } catch (error) {
                        this.setState({snackOpen: true, snackMessage: 'Erreur pendant l\'annulation', snackHorizontal: 'right'});
                    }
                    await this._updateCurrentRow();
                    return;
                case 'enable':
                    this.setState({snackOpen: true, snackMessage: 'Activation de la convention', snackHorizontal: 'right'});
                    const enabled = this.state.statusList.filter((status: any) => {
                        if(status.status === 0){
                            return true;
                        }
                        return false;
                    });
                    try {
                        await axios.post(this.state.apiURL + 'conventions/update/' + this.state.currentRow.id, {
                            statutId: enabled[0].id
                        }, { 
                            headers: {
                                Authorization: this.state.token
                            }
                        });
                    } catch (error) {
                        this.setState({snackOpen: true, snackMessage: 'Erreur pendant l\'activation', snackHorizontal: 'right'});
                    }
                    await this._updateCurrentRow();
                    return;
                case 'delete':
                    try {
                        await axios.post(this.state.apiURL + 'conventions/delete/' + this.state.currentRow.id, null, { 
                            headers: {
                                Authorization: this.state.token
                            }
                        });
                        this.setState({preview: false});
                        await this._loadConventions();
                        this.setState({snackOpen: true, snackMessage: 'Convention supprimée', snackHorizontal: 'right'});
                    } catch (error) {
                        this.setState({snackOpen: true, snackMessage: 'Erreur pendant la suppression', snackHorizontal: 'right'});
                    }
                    return;
            }
        }
        const state = this.state.statusList.filter((status) => {
            if(status.status === statusIdOrAction){
                return status;
            }
        });
        
        try {
            const update = await axios.post(this.state.apiURL + 'conventions/update/' + this.state.currentRow.id, {
                statutId: state[0].id
            }, { 
                headers: {
                    Authorization: this.state.token
                }
            });

            if(update.status === 200) {
                await this._updateCurrentRow();
            }
        } catch (error)  {
            this.setState({snackOpen: true, snackMessage: 'Erreur pendant la mise à jour du statut', snackHorizontal: 'right'});
        }
    }

    private async _updateCurrentRow() {
        await this._loadConventions();
        const updatedRow = this.state.rows.find((row) => {
            if(row.id === this.state.currentRow.id){
                return true;
            }
            return false;
        })
        this.setState({currentRow: updatedRow, snackOpen: true, snackMessage: 'Convention mise à jour', snackHorizontal: 'right'});
    } 

    private async _loadConventions(){
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
            this.setState({data:rows, rows: conventions, snackOpen: true, snackMessage: 'Conventions chargées', snackHorizontal: 'right'});
        } else {
            this.setState({snackOpen: true, snackMessage: 'Erreur pendant le chargement des conventions', snackHorizontal: 'right'});
        }
    }

    private async _loadStatusList(){
        const statusList = await axios.get(this.state.apiURL + 'statut/getAll');
        if(statusList.status === 200){
            this.setState({statusList: statusList.data.data});
        } else {
            this.setState({snackOpen: true, snackMessage: 'Erreur de chargement', snackHorizontal: 'right'});
        }
    }
}