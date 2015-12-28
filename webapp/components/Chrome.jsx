import React from 'react';
import Relay from 'react-relay';

import AppBar from 'material-ui/lib/app-bar';
import AppCanvas from 'material-ui/lib/app-canvas';
import Colors from 'material-ui/lib/styles/colors';
import Badge from 'material-ui/lib/badge';
//import Dialog from 'material-ui/lib/dialog';
import LightRawTheme from 'material-ui/lib/styles/raw-themes/light-raw-theme';
//import IconMenu from 'material-ui/lib/menus/icon-menu';
import IconButton from 'material-ui/lib/icon-button';
//import MenuItem from 'material-ui/lib/menus/menu-item';
//import NavigationClose from 'material-ui/lib/svg-icons/navigation/close';
import IconNotificationsEventAvailable from 'material-ui/lib/svg-icons/notification/event-available';
//import NavigationMoreVert from 'material-ui/lib/svg-icons/navigation/more-vert';
//import RaisedButton from 'material-ui/lib/raised-button';
import ThemeManager from 'material-ui/lib/styles/theme-manager';

import AppBar_NavigationMenu from './AppBar_NavigationMenu.jsx'

class Chrome extends React.Component
{
  constructor( )
  {
    super( );

    this.state = {
      muiTheme: ThemeManager.getMuiTheme( LightRawTheme ),
    };
  }

  componentWillMount( )
  {
    let newMuiTheme = ThemeManager.modifyRawThemePalette(this.state.muiTheme, {
      accent1Color: Colors.deepOrange500,
    });

    this.setState({muiTheme: newMuiTheme});
  }

  _handleOnFocusIncomplete( )
  {
    this.context.history.pushState( null, '/todos/active' );
  }

  render( )
  {
    let incompleteCount = this.props.viewer.totalCount - this.props.viewer.completedCount;

    let incompleteNotification = [ ];

    if( incompleteCount > 0 )
      incompleteNotification.push(
        <Badge key="top-incomplete" badgeContent={ incompleteCount } primary={ true } badgeStyle={{top:12, right:12}}>
          <IconButton tooltip="Incomplete TODOs" onFocus={ this._handleOnFocusIncomplete.bind( this ) }>
            <IconNotificationsEventAvailable />
          </IconButton>
        </Badge>
      );

    return (
      <AppCanvas>
        <AppBar
          title="TODO: Populate from helmet"
          iconElementLeft={ <AppBar_NavigationMenu /> }
          iconElementRight={
            <div style={ { marginTop: -13, marginBottom: -15 } }>
              { incompleteNotification }
            </div>
          }
        />

      <div style={ { paddingTop: 80, paddingLeft: 4, paddingRight: 4, } }>
          {this.props.children}
        </div>

      </AppCanvas>
    )
  }
};

//

Chrome.contextTypes = {
  history: React.PropTypes.object,
  muiTheme: React.PropTypes.object,
};

export default Relay.createContainer( Chrome, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        totalCount,
        completedCount,
      }
    `,
  },
});
