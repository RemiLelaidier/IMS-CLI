import axios from 'axios';
import * as React from 'react';

import { Snackbar, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, TextField  } from '@material-ui/core';
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
            snackMessage: ''
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
                        horizontal: 'right',
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

    private async _handlePreviewAction(statusId: number){
        const state = this.state.statusList.filter((status) => {
            if(status.status === statusId){
                return status;
            }
        });
        
        const update = await axios.post(this.state.apiURL + 'conventions/update/' + this.state.currentRow.id, {
            statutId: state[0].id
        }, { 
            headers: {
                Authorization: this.state.token
            }
        });

        if(update.status === 200) {
            await this._loadConventions();
            const updatedRow = this.state.rows.find((row) => {
                if(row.id === this.state.currentRow.id){
                    return true;
                }
                return false;
            })
            this.setState({currentRow: updatedRow});
        }
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
            this.setState({data:rows, rows: conventions, snackOpen: true, snackMessage: 'Conventions chargées'});
        } else {
            this.setState({snackOpen: true, snackMessage: 'Erreur pendant le chargement des conventions'});
        }
    }

    private async _loadStatusList(){
        const statusList = await axios.get(this.state.apiURL + 'statut/getAll');
        if(statusList.status === 200){
            this.setState({statusList: statusList.data.data});
        } else {
            this.setState({snackOpen: true, snackMessage: 'Erreur de chargement'});
        }
    }
}