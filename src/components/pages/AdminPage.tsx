import * as React from 'react';

import { Table, TableBody, TableCell, TableHead, TablePagination, TableRow, TextField } from '@material-ui/core';
import Paper from '@material-ui/core/Paper/Paper';
import Typography from '@material-ui/core/Typography/Typography';

interface AdminPageState {
    page: number,
    rowsPerPage: number
}

// tslint:disable-next-line:no-empty-interface
interface AdminPageProps { }

let id = 0;

export class AdminPage extends React.Component<AdminPageProps, AdminPageState> {
    constructor(props: AdminPageProps) {
        super(props);

        this.state = {
            page: 0,
            rowsPerPage: 25
        }

        this._handleChangePage = this._handleChangePage.bind(this);
        this._handleChangeRowsPerPage = this._handleChangeRowsPerPage.bind(this);
        this._handleSearch = this._handleSearch.bind(this);
    }

    public render() {
        const data = [
            this.createData('Frozen yoghurt', 'Jean-Luc', 'En attente', 'xxx1'),
            this.createData('Ice cream sandwich', 'Jean-Martin', 'En cours', 'xxx2'),
            this.createData('Eclair', 'Jean-Michel', 'En attente', 'xxx3'),
            this.createData('Cupcake', 'Jean-Louis', 'En attente', 'xxx4'),
            this.createData('Gingerbread', 'Jean-Philippe', 'En cours', 'xxx5'),
            this.createData('Cupcake', 'Jean-Louis', 'En attente', 'xxx6'),
            this.createData('Cupcake', 'Jean-Louis', 'En attente', 'xxx7'),
            this.createData('Cupcake', 'Jean-Louis', 'En attente', 'xxx8'),
            this.createData('Cupcake', 'Jean-Louis', 'En attente', 'xxx9'),
            this.createData('Cupcake', 'Jean-Louis', 'En attente', 'xxx10'),
            this.createData('Cupcake', 'Jean-Louis', 'En attente', 'xxx11'),
        ];

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
                        {data.slice(this.state.page * this.state.rowsPerPage,
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
                    count={data.length}
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
        return { id: id++, entreprise, etudiant, statut, rowId };
    }
}