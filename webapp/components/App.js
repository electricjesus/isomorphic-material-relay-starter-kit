import React from 'react';
import Relay from 'react-relay';

import AppBar from 'material-ui/lib/app-bar';
import Colors from 'material-ui/lib/styles/colors';
import Badge from 'material-ui/lib/badge';
import Dialog from 'material-ui/lib/dialog';
import LightRawTheme from 'material-ui/lib/styles/raw-themes/light-raw-theme';
import IconButton from 'material-ui/lib/icon-button';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import NavigationClose from 'material-ui/lib/svg-icons/navigation/close';
import IconNotificationsEventAvailable from 'material-ui/lib/svg-icons/notification/event-available';
import NavigationMoreVert from 'material-ui/lib/svg-icons/navigation/more-vert';
import RaisedButton from 'material-ui/lib/raised-button';
import ThemeManager from 'material-ui/lib/styles/theme-manager';

class App extends React.Component
{
  constructor( )
  {
    super( );
    this.state = {
      muiTheme: ThemeManager.getMuiTheme(LightRawTheme),
    };

    this.childContextTypes ={
      muiTheme: React.PropTypes.object,
    };
  }

  componentWillMount( )
  {
    let newMuiTheme = ThemeManager.modifyRawThemePalette(this.state.muiTheme, {
      accent1Color: Colors.deepOrange500,
    });

    this.setState({muiTheme: newMuiTheme});
  }

  _handleTouchIncomplete( )
  {
    console.log( 'Incomplete touched!!!!' );
    this.context.history.pushState(null, '/todos/active');
  }

  render( )
  {
    let incompleteCount = this.props.viewer.totalCount - this.props.viewer.completedCount;

    let incompleteNotification = [ ];

    if( incompleteCount > 0 )
      incompleteNotification.push(
        <Badge badgeContent={ incompleteCount } primary={ true } badgeStyle={{top:12, right:12}}>
          <IconButton tooltip="Incomplete TODOs" onFocus={ ( ) => this._handleTouchIncomplete( ) }>
            <IconNotificationsEventAvailable />
          </IconButton>
        </Badge>
      );

    return (
      <div>
        <AppBar
          title="TODO: Populate from helmet"
          iconElementRight={
            <div>
              { incompleteNotification }
              <IconMenu iconButtonElement={
                <IconButton><NavigationMoreVert /></IconButton>
              }>
                <MenuItem primaryText="Refresh" />
                <MenuItem primaryText="Help" />
                <MenuItem primaryText="Sign out" />
              </IconMenu>
            </div>
          }
        />

        {this.props.children}

      </div>
    )
  }
};

App.contextTypes = {
    history: React.PropTypes.object
};

export default Relay.createContainer(App, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        totalCount,
        completedCount,
      }
    `,
  },
});
