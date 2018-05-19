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
import { SignPage } from './components/pages/SignPage';
import { StudentPage } from './components/pages/StudentPage';
import { TrackPage } from './components/pages/TrackPage';
import { Pages } from './components/types';

import './App.css';

interface AppState {
  admin: boolean;
  page: Pages;
  login: boolean;
  tracking: boolean;
  anchorEl: HTMLElement | undefined;
  username: string | undefined,
  password: string | undefined,
  loginError: boolean;
  apiURL: string | undefined;
  showPassword: boolean;
  konami: string | null;
  tracked: any;
  refresh: any;
  signing: any;
  signed: any;
}

class App extends React.Component<{}, AppState> {
  constructor(props: any) {
    super(props);
    this.state = {
      tracking: false,
      admin: false,
      login: false,
      page: Pages.home,
      anchorEl: undefined,
      username: undefined,
      password: undefined,
      loginError: false,
      apiURL: process.env.REACT_APP_API,
      showPassword: false,
      konami: null,
      tracked: null,
      refresh: null,
      signing: false,
      signed: null
    }

    this._handleClose = this._handleClose.bind(this);
    this._handleMenu = this._handleMenu.bind(this);
    this._handleLoginChange = this._handleLoginChange.bind(this);
    this._handleConnect = this._handleConnect.bind(this);
    this._handleDisconnect = this._handleDisconnect.bind(this);
    this._handleClickShowPassword = this._handleClickShowPassword.bind(this);
    this._handleMouseDownPassword = this._handleMouseDownPassword.bind(this);
    this._checkTokenValidity = this._checkTokenValidity.bind(this);
    this._startRefresh = this._startRefresh.bind(this);
  }

  public async componentDidMount() {
    const currentURL = window.location.pathname;
    let tracking = this.state.tracking;
    let admin = this.state.admin;
    let signing = this.state.signing;

    if (currentURL.indexOf('/tracking/') !== -1) {
      const lastPart = currentURL.match(/([^\/]*)\/*$/);
      if(lastPart){
        const conventionId = lastPart[1];
        tracking = true;
        const req = await axios.get(this.state.apiURL + 'conventions/get/'+conventionId);
        this.setState({tracked: req.data.data[0]});
      }
    }

    if (currentURL.indexOf('/signing/') !== -1) {
      const lastPart = currentURL.match(/([^\/]*)\/*$/);
      if(lastPart){
        const conventionId = lastPart[1];
        signing = true;
        const req = await axios.get(this.state.apiURL + 'conventions/get/'+conventionId);
        this.setState({signed: req.data.data[0]});
      }
    }

    const tokenStored = sessionStorage.getItem('imsToken');
    if (tokenStored !== null) {
      const IntDate = jsrassign.jws.IntDate;
      let isValid = jsrassign.jws.JWS.verifyJWT(tokenStored, process.env.REACT_APP_JWT, { alg: ["HS256"], verifyAt: IntDate.getNow() });
      const tokenInfo = jsrassign.jws.JWS.readSafeJSONString(jsrassign.b64utoutf8(tokenStored.split(".")[1]));
      const expire = + new Date(tokenInfo.expires);
      const now = + new Date();
      if(now > expire) {
        isValid = false;
      }
      if (isValid) {
        admin = true;
        this._startRefresh();
      }
    }

    this.setState({admin, tracking, signing});

    document.body.addEventListener('keyup', (event: KeyboardEvent) => {
      if(this.state.konami 
          && this.state.konami.length === 5 
          && this.state.konami === 'miage') {
        this.setState({login: true});
      } else if(this.state.konami 
                && this.state.konami.length >= 5) {
        this.setState({konami: null});
      }
      if(event.key && event.key.length === 1){
        if(this.state.konami){
          this.setState({konami: this.state.konami + event.key});
        } else {
          this.setState({konami: event.key});
        }
      }
    }); 
  }

  public render() {
    const { admin, anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
        <div>
          <AppBar position="static" color="primary">
            <Toolbar>
              <Typography variant="title" color="inherit">
                Gestion des stages - Miage Nice
              </Typography>
              {admin && (
                <div style={{position: 'absolute', right: 0}}>
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
        {!this.state.tracking && this.state.signing && (
          <SignPage signed={this.state.signed} for="Entreprise" />
        )}
        {!this.state.signing && this.state.tracking && (
          <TrackPage tracked={this.state.tracked}/>
        )}
        {admin && (
          <AdminPage />
        )}
        {!this.state.signing && !this.state.tracking && !admin && (
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
              <Input id="username" onChange={this._handleLoginChange} />
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

  private _startRefresh(){
    const refresh = setInterval(this._checkTokenValidity, 3000);
    this.setState({refresh});
  }

  private _stopRefresh(){
    clearInterval(this.state.refresh);
  }

  private _checkTokenValidity(event: any) {
    const tokenStored = sessionStorage.getItem('imsToken');
    if(!tokenStored) {
      return;
    }

    let isValid = false;
    const tokenInfo = jsrassign.jws.JWS.readSafeJSONString(jsrassign.b64utoutf8(tokenStored.split(".")[1]));
    const expire = + new Date(tokenInfo.expires);
    const now = + new Date();
    if(now < expire) {
      isValid = true;
    }
    if (!isValid) {
      this.setState({admin: false, login: true});
    }
  }

  private _handleMouseDownPassword(event: any) {
    event.preventDefault();
  };

  private _handleClickShowPassword(event: any) {
    this.setState({ showPassword: !this.state.showPassword });
  };

  private Transition(props: any) {
    return <Slide direction="up" {...props} />;
  }

  private _handleLoginChange(event: any) {
    this.setState({ [event.target.id]: event.target.value });
  }

  private async _handleDisconnect(event: any) {
    this.setState({ admin: false });
    sessionStorage.removeItem('imsToken');
    this._stopRefresh();
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
      this.setState({ loginError: true });
    }

    if (res.status === 200) {
      console.log('connected !');
      sessionStorage.setItem('imsToken', res.data.result.token);
      this._startRefresh();
      this.setState({ admin: true, login: false });
    }
  }

  private _handleMenu(event: any) {
    this.setState({ anchorEl: event.currentTarget });
  };

  private _handleClose() {
    this.setState({ anchorEl: undefined, login: false });
  }
}

export default App;
