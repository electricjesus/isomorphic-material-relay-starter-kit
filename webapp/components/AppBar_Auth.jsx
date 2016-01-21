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
      Dialog_UserNameAndPassword_IsOpen: false,
      Dialog_LoginInProgress_IsOpen: false,
      Dialog_LoginFaulure_IsOpen: false,
    };
  }

  _handle_Open_Dialog_UserNameAndPassword( )
  {
    this.setState( {
      Dialog_UserNameAndPassword_IsOpen: true
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
      Dialog_UserNameAndPassword_IsOpen: false,
      Dialog_LoginInProgress_IsOpen: true,
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
      Dialog_UserNameAndPassword_IsOpen: false
    } );
  }

  _handleLoggingInCancel( )
  {
    this.setState( {
      Dialog_LoginInProgress_IsOpen: false
    } );
  }

  _handleAuthSuccess( response )
  {
    try{
      let responseJSON = JSON.parse( response );
      if( responseJSON.success != true ) throw new Error( "Login failed" );
    } catch( err ) { _handleAuthFailure( 1 ); return; }

    location.replace( location.href );
  }

  _handleAuthFailure( response )
  {
    let message;
    try{
      let responseJSON = JSON.parse( response );
      message = responseJSON.error;
    } catch( err ) { message = "Improper server response"; }

    this.setState( {
      Dialog_LoginInProgress_IsOpen: false,
      Dialog_LoginFaulure_IsOpen: true,
      Dialog_LoginFaulure_Message: message,
    } );
  }

  _handleLogInFaulureCancel( )
  {
    this.setState( {
      Dialog_LoginFaulure_IsOpen: false
    } );
  }

  Dialog_UserNameAndPassword( )
  {
    return(
      <Dialog
        open={ this.state.Dialog_UserNameAndPassword_IsOpen }
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
      Valid user name/combinations are: jack/secret jill/birthday
      </Dialog>
    );
  }

  Dialog_LoginInProgress( )
  {
    return(
      <Dialog
        open={ this.state.Dialog_LoginInProgress_IsOpen }
        title="Logging In ..."
        actions={ [
          <RaisedButton key="Cancel" label="Cancel" onTouchTap={ this._handleLoggingInCancel.bind( this ) } />,
        ] }
      >
        <LinearProgress mode="indeterminate" />
      </Dialog>
    );
  }

  Dialog_LoginFaulure( )
  {
    return(
      <Dialog
        open={ this.state.Dialog_LoginFaulure_IsOpen }
        title="Login failed"
        actions={ [
          <RaisedButton key="OK" label="OK" primary={true} onTouchTap={ this._handleLogInFaulureCancel.bind( this ) } />,
        ] }
      >
        { this.state.Dialog_LoginFaulure_Message }
      </Dialog>
    );
  }

  render( )
  {
    return(
      <IconButton key='login' tooltip="Log In"onTouchTap={ this._handle_Open_Dialog_UserNameAndPassword.bind( this ) }>
        <IconSocialPersonOutline />
        { this.Dialog_UserNameAndPassword( ) }
        { this.Dialog_LoginInProgress( ) }
        { this.Dialog_LoginFaulure( ) }
      </IconButton>
    );
  }
}

AppBar_Auth.contextTypes = {
  router: React.PropTypes.object.isRequired
};
