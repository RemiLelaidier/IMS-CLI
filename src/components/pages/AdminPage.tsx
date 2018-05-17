import axios from 'axios';
import * as React from 'react';

import { Table, TableBody, TableCell, TableHead, TablePagination, TableRow, TextField } from '@material-ui/core';
import Paper from '@material-ui/core/Paper/Paper';
import Typography from '@material-ui/core/Typography/Typography';

interface AdminPageState {
    page: number;
    rowsPerPage: number;
    apiURL: string | undefined;
    token: string | null;
    data: any[]
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
            data: []
        }

        this._handleChangePage = this._handleChangePage.bind(this);
        this._handleChangeRowsPerPage = this._handleChangeRowsPerPage.bind(this);
        this._handleSearch = this._handleSearch.bind(this);
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
                const row = this.createData(convention.entreprise.nomEntreprise, convention.etudiant.nom, '', convention.id);
                rows.push(row);
            });
            this.setState({data:rows});
        } else {
            console.log('erf');
        }
    }

    public render() {
        return (
            <Paper style={{ margin: 10, padding: 10 }}>
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
    };

    private _handleChangeRowsPerPage(event: any) {
        this.setState({ rowsPerPage: event.target.value });
    };

    private _handleSearch(event: any) {
        console.log('search', event.target.value);
    }

    private _handleRowClick(event: any) {
        console.log('rwClick on', event.target.id);
    }

    private createData(entreprise: string, etudiant: string, statut: string, rowId: string) {
        return { entreprise, etudiant, statut, rowId };
    }
}