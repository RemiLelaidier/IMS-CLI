import * as React from 'react';

import AppBar from '@material-ui/core/AppBar/AppBar';
import IconButton from '@material-ui/core/IconButton/IconButton';
import Toolbar from '@material-ui/core/Toolbar/Toolbar';
import Typography from '@material-ui/core/Typography/Typography';
import AccountCircle from '@material-ui/icons/AccountCircle';


import { AdminPage } from './components/pages/AdminPage';
import { StudentPage } from './components/pages/StudentPage';
import { Pages } from './components/types';

import './App.css';

import { FormControl, InputLabel } from '@material-ui/core';
import Button from '@material-ui/core/Button/Button';
import Dialog from '@material-ui/core/Dialog/Dialog';
import DialogActions from '@material-ui/core/DialogActions/DialogActions';
import DialogContent from '@material-ui/core/DialogContent/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle/DialogTitle';
import Menu from '@material-ui/core/Menu/Menu';
import MenuItem from '@material-ui/core/MenuItem/MenuItem';
import Slide from '@material-ui/core/Slide/Slide';
import { Input } from 'material-ui';

interface AppState {
  admin: boolean;
  page: Pages;
  login: boolean;
  anchorEl: HTMLElement | undefined;
  username: string | undefined,
  password: string | undefined
}

// tslint:disable-next-line:no-empty-interface
interface AppProps {}

class App extends React.Component<AppProps, AppState> {
  constructor (props: any) {
    super(props);
    this.state = {
      admin: false,
      login: false,
      page: Pages.home,
      anchorEl: undefined,
      username: undefined,
      password: undefined
    }

    this._handleClose = this._handleClose.bind(this);
    this._handleMenu = this._handleMenu.bind(this);
    this._handleLoginChange = this._handleLoginChange.bind(this);
    this._handleConnect = this._handleConnect.bind(this);
  }

  public componentDidMount(){
    const currentURL = window.location.pathname;
    let login = this.state.login;
    if(currentURL.indexOf('/!login') !== -1) {
      login = true;
    }
    this.setState({login});
  }

  public render() {
    const admin = false;
    const { anchorEl } = this.state;
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
          <Dialog
            open={this.state.login}
            TransitionComponent={this.Transition}
            keepMounted={true}
            onClose={this._handleClose}
          >
            <DialogTitle id="alert-dialog-slide-title">
              Connexion
            </DialogTitle>
            <DialogContent>
              <FormControl required={true}>
                <InputLabel>Utilisateur</InputLabel>
                <Input id="username" onChange={this._handleLoginChange}/>
              </FormControl>
              <FormControl required={true}>
                <InputLabel>Mot de passe</InputLabel>
                <Input id="password" onChange={this._handleLoginChange}/>
              </FormControl>
            </DialogContent>
            <DialogActions>
              <Button onClick={this._handleClose} color="primary">
                Annuler
              </Button>
              <Button onClick={this._handleConnect} color="primary">
                Connexion
              </Button>
            </DialogActions>
        </Dialog>
        </div>
    );
  }

  private Transition(props: any) {
    return <Slide direction="up" {...props} />;
  }

  private _handleLoginChange(event: any){
    this.setState({[event.target.id]: event.target.value});
  }

  private _handleConnect(event: any) {
    console.log('connect', this.state.username, this.state.password);
  }

  private _handleMenu(event: any){
    this.setState({ anchorEl: event.currentTarget });
  };

  private _handleClose(){
    this.setState({ anchorEl: undefined, login: false });
  }
}

export default App;
