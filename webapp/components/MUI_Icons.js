import React from 'react';
import Relay from 'react-relay';

import IconNavigationClose from 'material-ui/lib/svg-icons/navigation/close';
import IconNotificationsEventAvailable from 'material-ui/lib/svg-icons/notification/event-available';
import List from 'material-ui/lib/lists/list';
import ListDivider from 'material-ui/lib/lists/list-divider';
import ListItem from 'material-ui/lib/lists/list-item';


/*
import AppBar from 'material-ui/lib/app-bar';
import Colors from 'material-ui/lib/styles/colors';
import Badge from 'material-ui/lib/badge';
import Dialog from 'material-ui/lib/dialog';
import LightRawTheme from 'material-ui/lib/styles/raw-themes/light-raw-theme';
import IconButton from 'material-ui/lib/icon-button';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import IconNotificationsEventAvailable from 'material-ui/lib/svg-icons/notification/event-available';
import NavigationMoreVert from 'material-ui/lib/svg-icons/navigation/more-vert';
import RaisedButton from 'material-ui/lib/raised-button';
import ThemeManager from 'material-ui/lib/styles/theme-manager';
*/

class MUI_Icons extends React.Component
{
  render( )
  {
    return (
      <div>
        <List>
          <ListItem key="1" primaryText="IconNotificationsEventAvailable" leftIcon={<IconNotificationsEventAvailable />} />
        </List>
        <ListDivider />
        <List>
          <ListItem key="2" primaryText="NavigationClose" leftIcon={<IconNavigationClose />} />
        </List>
      </div>
    )
  }
};


MUI_Icons.contextTypes = {
    history: React.PropTypes.object
};


export default Relay.createContainer(MUI_Icons, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        totalCount,
      }
    `,
  },
});
