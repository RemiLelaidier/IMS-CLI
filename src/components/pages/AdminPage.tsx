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
            this.createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
            this.createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
            this.createData('Eclair', 262, 16.0, 24, 6.0),
            this.createData('Cupcake', 305, 3.7, 67, 4.3),
            this.createData('Gingerbread', 356, 16.0, 49, 3.9),
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
                    <TableCell>Dessert (100g serving)</TableCell>
                    <TableCell>Calories</TableCell>
                    <TableCell>Fat (g)</TableCell>
                    <TableCell>Carbs (g)</TableCell>
                    <TableCell>Protein (g)</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {data.map(n => {
                    return (
                    <TableRow key={n.id}>
                        <TableCell component="th" scope="row">
                        {n.name}
                        </TableCell>
                        <TableCell>{n.calories}</TableCell>
                        <TableCell>{n.fat}</TableCell>
                        <TableCell>{n.carbs}</TableCell>
                        <TableCell>{n.protein}</TableCell>
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

    private createData(name: string, calories: number, fat: number, carbs: number, protein: number) {
        const nextId = id++;

        return { id: nextId, name, calories, fat, carbs, protein };
    }
}