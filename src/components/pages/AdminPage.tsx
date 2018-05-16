import * as React from 'react';

import Paper from '@material-ui/core/Paper/Paper';
import Typography from '@material-ui/core/Typography/Typography';

// tslint:disable-next-line:no-empty-interface
interface AdminPageState {}
// tslint:disable-next-line:no-empty-interface
interface AdminPageProps {}

export class AdminPage extends React.Component<AdminPageProps, AdminPageState> {
    constructor(props: AdminPageProps) {
        super(props);

        this.state = {}
    }

    public render (){
        return (
        <div>
            <Paper style={{margin: 10, padding: 10}}>
                <Typography variant="title" color="inherit">
                    Administration
                </Typography>
            </Paper>           
        </div>
        );
    }
}