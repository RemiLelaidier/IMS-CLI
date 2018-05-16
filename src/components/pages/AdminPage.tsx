import * as React from 'react';

import { Table, TableBody, TableCell, TableHead, TablePagination, TableRow, TextField } from '@material-ui/core';
import Paper from '@material-ui/core/Paper/Paper';
import Typography from '@material-ui/core/Typography/Typography';

interface AdminPageState {
    page: number,
    rowsPerPage: number
}

// tslint:disable-next-line:no-empty-interface
interface AdminPageProps {}

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

    public render (){
        const data = [
            this.createData('Frozen yoghurt', 'Jean-Luc', 'En attente'),
            this.createData('Ice cream sandwich', 'Jean-Martin', 'En cours'),
            this.createData('Eclair', 'Jean-Michel', 'En attente'),
            this.createData('Cupcake', 'Jean-Louis', 'En attente'),
            this.createData('Gingerbread', 'Jean-Philippe', 'En cours'),
        ];

        return (
        <Paper style={{margin: 10, padding: 10}}>
            <Typography variant="title" color="inherit">
                Administration
            </Typography>
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
                {data.map(n => {
                    return (
                    <TableRow key={n.id}>
                        <TableCell>{n.etudiant}</TableCell>
                        <TableCell>{n.entreprise}</TableCell>
                        <TableCell>{n.statut}</TableCell>
                    </TableRow>
                    );
                })}
                </TableBody>
            </Table>
            <TablePagination
                component="div"
                count={data.length}
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

    private _handleChangePage(event: any, page: any){
        this.setState({ page });
    };
    
    private _handleChangeRowsPerPage(event: any) {
        this.setState({ rowsPerPage: event.target.value });
    };

    private _handleSearch(event: any){
        console.log('search', event.target.value);
    }

    private createData(entreprise: string, etudiant: string, statut: string) {
        return { id: id++, entreprise, etudiant, statut };
    }
}