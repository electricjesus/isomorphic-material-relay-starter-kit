import React from 'react';
import Relay from 'react-relay';

import Avatar from 'material-ui/lib/avatar';
import Dialog from 'material-ui/lib/dialog';
import Divider from 'material-ui/lib/divider';
import FlatButton from 'material-ui/lib/flat-button';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import IconButton from 'material-ui/lib/icon-button';
import IconSocialPerson from 'material-ui/lib/svg-icons/social/person';
import IconSocialPersonOutline from 'material-ui/lib/svg-icons/social/person-outline';
import LinearProgress from 'material-ui/lib/linear-progress';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import MenuItem from 'material-ui/lib/menus/menu-item';
import Popover from 'material-ui/lib/popover/popover';
import TextField from 'material-ui/lib/text-field';

import { postXHR } from '../scripts/XHR';

const styles = {
  popover: {
    padding: 10,
  },
};


class AppBar_Auth extends React.Component
{
  constructor( props )
  {
    super( props );

    this.state = {
      Dialog_AuthenticationChallenge_IsOpen: false,
      Dialog_AuthenticationInProgress_IsOpen: false,
      Dialog_AuthenticationFailed_IsOpen: false,
      Dialog_CreateUser_IsOpen : false,
      Dialog_CreateUserInProgress_IsOpen: false,
      Dialog_CreateUserFailed_IsOpen: false,
      Popover_AuthorizedUser_IsOpen : false,
    };
  }



  //

  _handle_Authentication_Response_Success( response )
  {
    try{
      let responseJSON = JSON.parse( response );
      if( responseJSON.success != true ) throw new Error( "Login failed" );
    } catch( err ) { _handle_Authentication_Response_Failure( 1 ); return; }

    location.replace( location.href );
  }

  _handle_Authentication_Response_Failure( response )
  {
    let message;
    try{
      let responseJSON = JSON.parse( response );
      message = responseJSON.error;
    } catch( err ) { message = "Improper server response"; }

    this.setState( {
      Dialog_AuthenticationInProgress_IsOpen: false,
      Dialog_AuthenticationFailed_IsOpen: true,
      Dialog_AuthenticationFailed_Message: message,
    } );
  }



  //

  _handle_CreateUser_Response_Success( response )
  {
    try{
      let responseJSON = JSON.parse( response );
      if( responseJSON.success != true ) throw new Error( "New User Creation failed" );
    } catch( err ) { _handle_CreateUser_Response_Failure( 1 ); return; }

    location.replace( location.href );
  }

  _handle_CreateUser_Response_Failure( response )
  {
    let message;
    try{
      let responseJSON = JSON.parse( response );
      message = responseJSON.error;
    } catch( err ) { message = "Improper server response"; }

    this.setState( {
      Dialog_CreateUserInProgress_IsOpen: false,
      Dialog_CreateUserFailed_IsOpen: true,
      Dialog_CreateUserFailed_Message: message,
    } );
  }



  //

  Dialog_AuthenticationChallenge( )
  {
    return(
      <Dialog
        open={ this.state.Dialog_AuthenticationChallenge_IsOpen }
        title="Log In"
        actions={ [
          <FlatButton key="Cancel" label="Cancel" onTouchTap={ this._handle_onTouchTap_AuthenticationChallenge_Cancel } />,
          <FlatButton key="CreateUser" label="Create User" secondary={true} onTouchTap={ this._handle_onTouchTap_AuthenticationChallenge_CreateUser } />,
          <FlatButton key="LogIn" label="Log In" primary={true} onTouchTap={ this._handle_onTouchTap_AuthenticationChallenge_LogIn } />,
        ] }
      >
        <TextField
          ref="username"
          floatingLabelText="E-Mail"
          fullWidth={ true }
          onEnterKeyDown={ this._handle_onEnterKeyDown_AuthenticationChallenge_UserName }
        />
        <TextField
          ref="password"
          type="password"
          floatingLabelText="Password"
          fullWidth={ true }
          onEnterKeyDown={ this._handle_onEnterKeyDown_AuthenticationChallenge_Password }
        />
      Valid user name/combinations are: jack/secret jill/birthday
      </Dialog>
    );
  }

  Dialog_AuthenticationChallenge_Open = ( ) =>
  {
    this.setState( {
      Dialog_AuthenticationChallenge_IsOpen: true
    } );
  };

  _handle_onEnterKeyDown_AuthenticationChallenge_UserName = ( ) =>
  {
    this.refs.password.focus( );
  };

  _handle_onEnterKeyDown_AuthenticationChallenge_Password = ( ) =>
  {
    this._handle_onTouchTap_AuthenticationChallenge_LogIn( );
  };

  _handle_onTouchTap_AuthenticationChallenge_LogIn = ( ) =>
  {
    this.setState( {
      Dialog_AuthenticationChallenge_IsOpen: false,
      Dialog_AuthenticationInProgress_IsOpen: true,
    } );

    var loc = window.location;
    var host = loc.protocol + "//" + loc.hostname + ":" + loc.port;

    postXHR(
      host + '/auth/login',
      {
        username: this.refs.username.getValue( ),
        password: this.refs.password.getValue( ),
      },
      ( response ) => this._handle_Authentication_Response_Success( response ),
      ( response ) => this._handle_Authentication_Response_Failure( response )
    );
  };

  _handle_onTouchTap_AuthenticationChallenge_CreateUser = ( ) =>
  {
    this.setState( {
      Dialog_AuthenticationChallenge_IsOpen: false,
      Dialog_CreateUser_IsOpen: true,
    } );
  }

  _handle_onTouchTap_AuthenticationChallenge_Cancel = ( ) =>
  {
    this.setState( {
      Dialog_AuthenticationChallenge_IsOpen: false
    } );
  };



  //

  Dialog_CreateUser( )
  {
    return(
      <Dialog
        open={ this.state.Dialog_CreateUser_IsOpen }
        title="Create New User"
        actions={ [
          <FlatButton key="Cancel" label="Cancel" onTouchTap={ this._handle_onTouchTap_CreateUser_Cancel } />,
          <FlatButton key="CreateUser" label="Create User" primary={true} onTouchTap={ this._handle_onTouchTap_AuthenticationChallenge_LogIn } />,
        ] }
      >
        <TextField
          ref="username"
          floatingLabelText="E-Mail"
          fullWidth={ true }
          onEnterKeyDown={ this._handle_onEnterKeyDown_AuthenticationChallenge_UserName }
        />
        <TextField
          ref="password"
          type="password"
          floatingLabelText="Password"
          fullWidth={ true }
        />
        <br/><br/>Password strength:
        <LinearProgress mode="determinate" value={ 50 } />
      </Dialog>
    );
  }

  _handle_onTouchTap_CreateUser_OK = ( ) =>
  {
    this.setState( {
      Dialog_CreateUser_IsOpen: false,
      Dialog_CreateUserInProgress_IsOpen: true,
    } );

    var loc = window.location;
    var host = loc.protocol + "//" + loc.hostname + ":" + loc.port;

    postXHR(
      host + '/auth/createuser',
      {
        username: this.refs.username.getValue( ),
        password: this.refs.password.getValue( ),
      },
      ( response ) => this._handle_CreateUser_Response_Success( response ),
      ( response ) => this._handle_CreateUser_Response_Failure( response )
    );
  }

  _handle_onTouchTap_CreateUser_Cancel = ( ) =>
  {
    this.setState( {
      Dialog_CreateUser_IsOpen: false
    } );
  };



  //

  Dialog_AuthenticationInProgress( )
  {
    return(
      <Dialog
        open={ this.state.Dialog_AuthenticationInProgress_IsOpen }
        title="Logging In ..."
        actions={ [
          <FlatButton key="Cancel" label="Cancel" onTouchTap={ this._handle_onTouchTap_AuthenticationInProgress_Cancel } />,
        ] }
      >
        <LinearProgress mode="indeterminate" />
      </Dialog>
    );
  }

  _handle_onTouchTap_AuthenticationInProgress_Cancel = ( ) =>
  {
    this.setState( {
      Dialog_AuthenticationInProgress_IsOpen: false
    } );
  };



  //

  Dialog_AuthenticationFailed( )
  {
    return(
      <Dialog
        open={ this.state.Dialog_AuthenticationFailed_IsOpen }
        title="Login failed"
        actions={ [
          <FlatButton key="OK" label="OK" primary={true} onTouchTap={ this._handle_onTouchTap_LogInFailure_OK } />,
        ] }
      >
        { this.state.Dialog_AuthenticationFailed_Message }
      </Dialog>
    );
  }

  _handle_onTouchTap_LogInFailure_OK = ( ) =>
  {
    this.setState( {
      Dialog_AuthenticationFailed_IsOpen: false
    } );
  };



  //

  Dialog_CreateUserInProgress( )
  {
    return(
      <Dialog
        open={ this.state.Dialog_CreateUserInProgress_IsOpen }
        title="Creating user ..."
        actions={ [
          <FlatButton key="Cancel" label="Cancel" onTouchTap={ this._handle_onTouchTap_CreateUserInProgress_Cancel } />,
        ] }
      >
        <LinearProgress mode="indeterminate" />
      </Dialog>
    );
  }

  _handle_onTouchTap_CreateUserInProgress_Cancel = ( ) =>
  {
    this.setState( {
      Dialog_CreateUserInProgress_IsOpen: false
    } );
  };




  //

  Dialog_CreateUserFailed( )
  {
    return(
      <Dialog
        open={ this.state.Dialog_CreateUserFailed_IsOpen }
        title="Creating user failed"
        actions={ [
          <FlatButton key="OK" label="OK" primary={true} onTouchTap={ this._handle_onTouchTap_CreateUserFailed_OK } />,
        ] }
      >
        { this.state.Dialog_CreateUserFailed_Message }
      </Dialog>
    );
  }

  _handle_onTouchTap_CreateUserFailed_OK = ( ) =>
  {
    this.setState( {
      Dialog_CreateUserFailed_IsOpen: false
    } );
  };



  //

  Popover_AuthorizedUser( )
  {
    return (
      <Popover
        open={this.state.Popover_AuthorizedUser_IsOpen}
        anchorEl={this.state.anchorEl}
        anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
        targetOrigin={{horizontal: 'left', vertical: 'top'}}
        onRequestClose={this._handle_Popover_AuthorizedUser_Close}
      >
        <div style={styles.popover}>
          <List subheader="Logged In as">
            <ListItem
              primaryText={ this.props.Viewer.User_DisplayName }
              leftAvatar={<Avatar src={ this.props.Viewer.User_ProfilePhoto } />}
            />
          </List>
          <Divider />
          <List>
            <ListItem primaryText="Profile" />
            <ListItem primaryText="Settings" />
          </List>
          <Divider />
          <List>
            <ListItem primaryText="Log in as a different user" onTouchTap={ this._handle_Popover_AuthorizedUser_LogInAsADifferentUser } />
            <ListItem primaryText="Log out" onTouchTap={ this._handle_Popover_AuthorizedUser_LogOut } />
          </List>
        </div>
      </Popover>
    );
  }

  _handle_Popover_AuthorizedUser_LogInAsADifferentUser = ( ) =>
  {
    this.setState( {
      Popover_AuthorizedUser_IsOpen: false,
    } );
    this.Dialog_AuthenticationChallenge_Open( );
  };

  _handle_Popover_AuthorizedUser_LogOut = ( ) =>
  {
    // TODO
    // Since the cookie is an HTTP ONLY cookie, it can not be changed from the client.
    // A Request to the server will be required to log out
    document.cookie = 'auth_token=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    location.replace( location.href );
  };

  _handle_Popover_AuthorizedUser_Close = ( ) =>
  {
    this.setState( {
      Popover_AuthorizedUser_IsOpen: false,
    } );
  };



  //

  render( )
  {
    if( this.props.Viewer.User_IsAnonymous )
      return(
        <IconButton key='login' tooltip="Log In" onTouchTap={ this.Dialog_AuthenticationChallenge_Open }>
          <IconSocialPersonOutline />
          { this.Dialog_AuthenticationChallenge( ) }
          { this.Dialog_AuthenticationInProgress( ) }
          { this.Dialog_AuthenticationFailed( ) }
          { this.Dialog_CreateUser( ) }
          { this.Dialog_CreateUserInProgress( ) }
          { this.Dialog_CreateUserFailed( ) }
        </IconButton>
      );
    else
      // User has already logged in
      return(
        <IconButton key='authenticated' tooltip="User menu" onTouchTap={ this._handle_AuthorizedUserIcon_TouchTap }>
          <IconSocialPerson />
          { this.Popover_AuthorizedUser( ) }
          { this.Dialog_AuthenticationChallenge( ) }
          { this.Dialog_AuthenticationInProgress( ) }
          { this.Dialog_AuthenticationFailed( ) }
          { this.Dialog_CreateUser( ) }
          { this.Dialog_CreateUserInProgress( ) }
          { this.Dialog_CreateUserFailed( ) }
        </IconButton>
      );
  }

  _handle_AuthorizedUserIcon_TouchTap = ( event ) =>
  {
    this.setState( {
      Popover_AuthorizedUser_IsOpen: true,
      anchorEl: event.currentTarget,
    } );
  };
}

AppBar_Auth.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default Relay.createContainer( AppBar_Auth, {
  fragments: {
    Viewer: () => Relay.QL`
      fragment on Viewer {
        User_IsAnonymous,
        User_DisplayName,
        User_ProfilePhoto,
      }
    `,
  },
});
