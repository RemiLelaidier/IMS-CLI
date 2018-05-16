import * as React from 'react';

import AppBar from '@material-ui/core/AppBar/AppBar';
import IconButton from '@material-ui/core/IconButton/IconButton';
import Toolbar from '@material-ui/core/Toolbar/Toolbar';
import Typography from '@material-ui/core/Typography/Typography';
import AccountCircle from '@material-ui/icons/AccountCircle';

import { Pages } from './components/types';

import { StudentPage } from './components/pages/StudentPage';

import './App.css';

import Menu from '@material-ui/core/Menu/Menu';
import MenuItem from '@material-ui/core/MenuItem/MenuItem';
import { AdminPage } from './components/pages/AdminPage';

interface AppState {
  admin: boolean;
  page: Pages;
  anchorEl: HTMLElement | undefined;
}

// tslint:disable-next-line:no-empty-interface
interface AppProps {}

class App extends React.Component<AppProps, AppState> {
  constructor (props: any) {
    super(props);
    this.state = {
      admin: false,
      page: Pages.home,
      anchorEl: undefined,
    }

    this._handleClose = this._handleClose.bind(this);
    this._handleMenu = this._handleMenu.bind(this);
  }

  public render() {
    const currentURL = window.location.pathname;
    const { anchorEl } = this.state;
    let admin = this.state.admin;
    if(currentURL.indexOf('/!admin') !== -1) {
      admin = true;
    }
    const open = Boolean(anchorEl);

    return (
        <div>
          <AppBar position="static" color="primary" >
            <Toolbar>
              <Typography variant="title" color="inherit">
                StaMIAGE
              </Typography>
              {admin && (
              <div>
                <IconButton
                  aria-owns={open ? 'menu-appbar' : ''}
                  aria-haspopup="true"
                  color="inherit"
                  onClick={this._handleMenu}
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={this._handleClose}
                >
                  <MenuItem onClick={this._handleClose}>Administration</MenuItem>
                </Menu>
              </div>
              )}
            </Toolbar>
          </AppBar>
          {admin && (
            <AdminPage />
          )}
          {!admin && (
            <StudentPage />
          )}
        </div>
    );
  }

  private _handleMenu(event: any){
    this.setState({ anchorEl: event.currentTarget });
  };

  private _handleClose(){
    this.setState({ anchorEl: undefined });
  }
}

export default App;
