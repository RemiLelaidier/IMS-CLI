import * as React from 'react';
import './App.css';

import { AppBar } from 'material-ui';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { Pages } from './components/types'

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
  }

  public render() {
    return (
      <MuiThemeProvider>
        <AppBar
          title="StaMIAGE" 
        />
      </MuiThemeProvider>
    );
  }
}

export default App;
