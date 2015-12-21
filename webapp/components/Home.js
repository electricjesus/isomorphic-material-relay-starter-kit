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

const containerStyle = {
  textAlign: 'center',
  paddingTop: 200,
};

class Home extends React.Component
{
  constructor( props )
  {
    super( props );
    this.state = {
      open: false,
    }
  }

  _handleRequestClose( )
  {
    this.setState({
      open: false,
    });
  }

  _handleTouchTap( )
  {
    this.setState({
      open: true,
    });
  }

  render( )
  {
    return (
      <div style={containerStyle}>
        <h1>material-ui</h1>
        <h2>example project</h2>
        <RaisedButton label="Super Secret Password" primary={true} onTouchTap={ ( ) => this._handleTouchTap( ) } />
          <Dialog
            open={this.state.open}
            title="Super Secret Password"
            actions={ [
              <RaisedButton key="OK" label="OK" primary={true} onTouchTap={ ( ) => this._handleRequestClose( ) } />,
            ] }
            zzzonRequestClose={ ( ) => this._handleRequestClose( ) }
          >
            1-2-3-4-5
          </Dialog>
      </div>
    )
  }
};

/*
*/

export default Relay.createContainer(Home, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        totalCount,
      }
    `,
  },
});
