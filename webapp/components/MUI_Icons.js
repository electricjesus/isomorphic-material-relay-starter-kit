import React from 'react';
import Relay from 'react-relay';

import Card from 'material-ui/lib/card/card';
import IconNavigationClose from 'material-ui/lib/svg-icons/navigation/close';
import IconNotificationsEventAvailable from 'material-ui/lib/svg-icons/notification/event-available';
import List from 'material-ui/lib/lists/list';
import ListDivider from 'material-ui/lib/lists/list-divider';
import ListItem from 'material-ui/lib/lists/list-item';

class MUI_Icons extends React.Component
{
  render( )
  {
    return (
      <div>
        <Card>
          <List>
            <ListItem key="1" primaryText="IconNotificationsEventAvailable" leftIcon={<IconNotificationsEventAvailable />} />
            <ListDivider inset={true} />
            <ListItem key="2" primaryText="IconNotificationsEventAvailable" leftIcon={<IconNotificationsEventAvailable />} />
            <ListDivider inset={true} />
            <ListItem key="3" primaryText="NavigationClose" leftIcon={<IconNavigationClose />} />
          </List>
        </Card>
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
