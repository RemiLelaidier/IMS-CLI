import * as React from 'react';
import './App.css';

import AppBar from '@material-ui/core/AppBar/AppBar';
import Toolbar from '@material-ui/core/Toolbar/Toolbar';
import Typography from '@material-ui/core/Typography/Typography';
import { StudentPage } from './components/pages/StudentPage';
import { Pages } from './components/types';

interface IAppState {
  logged: boolean;
  page: Pages;
}

class App extends React.Component<{}, IAppState> {
  constructor (props: any) {
    super(props);
    this.state = {
      logged: false,
      page: Pages.home
    }

    this.onChangePage = this.onChangePage.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  public render() {
    return (
        <div>
          <AppBar position="static" color="default">
            <Toolbar>
              <Typography variant="title" color="inherit">
                StaMIAGE
              </Typography>
            </Toolbar>
          </AppBar>
          <StudentPage 
            onChangePage={this.onChangePage}
            onSubmit={this.onSubmit}
          />
        </div>
    );
  }

  public onSubmit(data: any) {
    console.log(data);
  }

  public onChangePage(page: Pages) {
    console.log(page);
  }
}

export default App;
