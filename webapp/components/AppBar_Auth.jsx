import React from 'react';

import Dialog from 'material-ui/lib/dialog';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import IconButton from 'material-ui/lib/icon-button';
import IconSocialPerson from 'material-ui/lib/svg-icons/social/person';
import IconSocialPersonOutline from 'material-ui/lib/svg-icons/social/person-outline';
import LinearProgress from 'material-ui/lib/linear-progress';
import MenuItem from 'material-ui/lib/menus/menu-item';
import RaisedButton from 'material-ui/lib/raised-button';
import TextField from 'material-ui/lib/text-field';

import { postXHR } from '../scripts/XHR';

export default class AppBar_Auth extends React.Component
{
  constructor( props )
  {
    super( props );

    this.state = {
      LogInDialogOpen: false,
      LoggingInDialogOpen: false,
      LoggInFailureDialogOpen: false,
    };
  }

  _handleOpenLogInDialog( )
  {
    this.setState( {
      LogInDialogOpen: true
    } );
  }

  _handleUserNameEnterKeyDown( )
  {
    this.refs.Password.focus( );
  }

  _handlePasswordEnterKeyDown( )
  {
    this._handleLogInOK( );
  }

  _handleLogInOK( )
  {
    this.setState( {
      LogInDialogOpen: false,
      LoggingInDialogOpen: true,
    } );

    var loc = window.location;
    var host = loc.protocol + "//" + loc.hostname + ":" + loc.port;

    postXHR(
      host + '/auth',
      {
        username: this.refs.username.getValue( ),
        password: this.refs.password.getValue( ),
      },
      ( response ) => this._handleAuthSuccess( response ),
      ( response ) => this._handleAuthFailure( response )
    );
  }

  _handleLogInCancel( )
  {
    this.setState( {
      LogInDialogOpen: false
    } );
  }

  _handleLoggingInCancel( )
  {
    this.setState( {
      LoggingInDialogOpen: false
    } );
  }

  _handleAuthSuccess( response )
  {
    console.log( '_handleAuthSuccess ' + response )
    let token;
    try{
      let responseJSON = JSON.parse( response );
      token = responseJSON.token;
    } catch( err ) { _handleAuthFailure( 1 ); return; }

    console.log( '_handleAuthSuccess ' + token );
  }

  _handleAuthFailure( response )
  {
    console.log( '_handleAuthFailure ' + response )
    let message;
    try{
      let responseJSON = JSON.parse( response );
      message = responseJSON.error;
    } catch( err ) { message = "Improper server response"; }

    this.setState( {
      LoggingInDialogOpen: false,
      LogInFaulureDialogOpen: true,
      LogInFaulureDialogMessage: message,
    } );
  }

  _handleLogInFaulureCancel( )
  {
    this.setState( {
      LogInFaulureDialogOpen: false
    } );
  }


/* A menu will be displayed for a logged in user
<IconMenu key="top-menu"
  anchorOrigin={ { vertical: "bottom" } }
  onItemTouchTap={ this._handleLeftMenuTouchTap.bind( this ) }
  iconButtonElement={
    <IconButton><NavigationMoreVert /></IconButton>
  }
>
  <MenuItem key="/" primaryText="Home" />
  <MenuItem key="/todos" primaryText="To Do" />
  <MenuItem key="/mui" primaryText="MUI" />
  <MenuItem key="/mui/icons" primaryText="MUI Icons" />
</IconMenu>
*/

  loginDialog( )
  {
    return(
      <Dialog
        open={ this.state.LogInDialogOpen }
        title="Log In"
        actions={ [
          <RaisedButton key="Cancel" label="Cancel" onTouchTap={ this._handleLogInCancel.bind( this ) } />,
          <RaisedButton key="OK" label="OK" primary={true} onTouchTap={ this._handleLogInOK.bind( this ) } />,
        ] }
      >
        <TextField
          ref="username"
          floatingLabelText="E-Mail"
          fullWidth={ true }
          onEnterKeyDown={ this._handleUserNameEnterKeyDown.bind( this ) }
        />
        <TextField
          ref="password"
          type="password"
          floatingLabelText="Password"
          fullWidth={ true }
          onEnterKeyDown={ this._handlePasswordEnterKeyDown.bind( this ) }
        />
      </Dialog>
    );
  }

  loggingInDialog( )
  {
    return(
      <Dialog
        open={ this.state.LoggingInDialogOpen }
        title="Logging In ..."
        actions={ [
          <RaisedButton key="Cancel" label="Cancel" onTouchTap={ this._handleLoggingInCancel.bind( this ) } />,
        ] }
      >
        <LinearProgress mode="indeterminate" />
      </Dialog>
    );
  }

  LogInFaulureDialog( )
  {
    return(
      <Dialog
        open={ this.state.LogInFaulureDialogOpen }
        title="Login failed"
        actions={ [
          <RaisedButton key="OK" label="OK" primary={true} onTouchTap={ this._handleLogInFaulureCancel.bind( this ) } />,
        ] }
      >
        { this.state.LogInFaulureDialogMessage }
      </Dialog>
    );
  }

  render( )
  {
    return(
      <IconButton key='login' tooltip="Log In"onTouchTap={ this._handleOpenLogInDialog.bind( this ) }>
        <IconSocialPersonOutline />
        { this.loginDialog( ) }
        { this.loggingInDialog( ) }
        { this.LogInFaulureDialog( ) }
      </IconButton>
    );
  }
}

AppBar_Auth.contextTypes = {
  history: React.PropTypes.object,
};
