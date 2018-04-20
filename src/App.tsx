import * as React from 'react';
import './App.css';

import { AppBar } from 'material-ui';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

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
      <MuiThemeProvider>
        <div>
          <AppBar
            title="StaMIAGE" 
          />
          <StudentPage 
            onChangePage={this.onChangePage}
            onSubmit={this.onSubmit}
          />
        </div>
      </MuiThemeProvider>
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
