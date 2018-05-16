import axios from 'axios';
import * as jsrassign from 'jsrsasign';
import * as React from 'react';

import { FormControl, InputAdornment, InputLabel } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar/AppBar';
import Button from '@material-ui/core/Button/Button';
import Dialog from '@material-ui/core/Dialog/Dialog';
import DialogActions from '@material-ui/core/DialogActions/DialogActions';
import DialogContent from '@material-ui/core/DialogContent/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle/DialogTitle';
import IconButton from '@material-ui/core/IconButton/IconButton';
import Menu from '@material-ui/core/Menu/Menu';
import MenuItem from '@material-ui/core/MenuItem/MenuItem';
import Slide from '@material-ui/core/Slide/Slide';
import Toolbar from '@material-ui/core/Toolbar/Toolbar';
import Typography from '@material-ui/core/Typography/Typography';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { Input } from 'material-ui';

import { AdminPage } from './components/pages/AdminPage';
import { StudentPage } from './components/pages/StudentPage';
import { Pages } from './components/types';

import './App.css';

interface AppState {
  admin: boolean;
  page: Pages;
  login: boolean;
  anchorEl: HTMLElement | undefined;
  username: string | undefined,
  password: string | undefined,
  loginError: boolean;
  apiURL: string;
  showPassword: boolean;
}

class App extends React.Component<{}, AppState> {
  constructor (props: any) {
    super(props);
    this.state = {
      admin: false,
      login: false,
      page: Pages.home,
      anchorEl: undefined,
      username: undefined,
      password: undefined,
      loginError: false,
      apiURL: 'http://localhost:8080/api/',
      showPassword: false
    }

    this._handleClose = this._handleClose.bind(this);
    this._handleMenu = this._handleMenu.bind(this);
    this._handleLoginChange = this._handleLoginChange.bind(this);
    this._handleConnect = this._handleConnect.bind(this);
    this._handleDisconnect = this._handleDisconnect.bind(this);
    this._handleClickShowPassword = this._handleClickShowPassword.bind(this);
    this._handleMouseDownPassword = this._handleMouseDownPassword.bind(this);
  }

  public componentDidMount(){
    const currentURL = window.location.pathname;
    let login = this.state.login;
    let admin = this.state.admin;

    if(currentURL.indexOf('/!login') !== -1) {
      login = true;
    }

    const tokenStored = sessionStorage.getItem('imsToken');
    if(tokenStored !== null){
      const isValid = jsrassign.jws.JWS.verifyJWT(tokenStored, 'MiaowMiaow', {alg: ["HS256"]});

      if(isValid){
        login = false;
        admin = true;
      }
    }
    this.setState({login, admin});
  }

  public render() {
    const { admin, anchorEl } = this.state;
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
                  <MenuItem onClick={this._handleDisconnect}>Déconnexion</MenuItem>
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
              <FormControl required={true} error={this.state.loginError}>
                <InputLabel>Utilisateur</InputLabel>
                <Input id="username" onChange={this._handleLoginChange}/>
              </FormControl>
              <FormControl required={true} error={this.state.loginError}>
                <InputLabel htmlFor="password">Mot de passe</InputLabel>
                <Input
                  id="password"
                  type={this.state.showPassword ? 'text' : 'password'}
                  onChange={this._handleLoginChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="Afficher le mot de passe"
                        onClick={this._handleClickShowPassword}
                        onMouseDown={this._handleMouseDownPassword}
                      >
                        {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
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

  private _handleMouseDownPassword(event: any) {
    event.preventDefault();
  };

  private _handleClickShowPassword(event: any){
    this.setState({ showPassword: !this.state.showPassword });
  };

  private Transition(props: any) {
    return <Slide direction="up" {...props} />;
  }

  private _handleLoginChange(event: any){
    this.setState({[event.target.id]: event.target.value});
  }

  private async _handleDisconnect(event: any) {
    this.setState({admin: false});
    sessionStorage.removeItem('imsToken');
  }

  private async _handleConnect(event: any) {
    let res = {
      status: 403,
      data: {
        result: { token: '' }
      },
    };

    try {
      res = await axios.post(this.state.apiURL + 'users/login', {
        username: this.state.username,
        password: this.state.password
      })
    } catch {
      this.setState({loginError: true});
    }

    if (res.status === 200) {
      console.log('connected !');
      this.setState({admin: true, login: false});
      sessionStorage.setItem('imsToken', res.data.result.token);
    }
  }

  private _handleMenu(event: any){
    this.setState({ anchorEl: event.currentTarget });
  };

  private _handleClose(){
    this.setState({ anchorEl: undefined, login: false });
  }
}

export default App;
