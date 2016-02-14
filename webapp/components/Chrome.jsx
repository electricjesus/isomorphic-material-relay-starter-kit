import Helmet from "react-helmet";
import React from 'react';
import Relay from 'react-relay';

import AppCanvas from 'material-ui/lib/app-canvas';
import Badge from 'material-ui/lib/badge';
import ColorManipulator from 'material-ui/lib/utils/color-manipulator';
import getMuiTheme from 'material-ui/lib/styles/getMuiTheme';
import IconButton from 'material-ui/lib/icon-button';
import IconNotificationsEventAvailable from 'material-ui/lib/svg-icons/notification/event-available';
import ToolBar from 'material-ui/lib/toolbar/toolbar';
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group';
import ToolbarSeparator from 'material-ui/lib/toolbar/toolbar-separator';
import ToolbarTitle from 'material-ui/lib/toolbar/toolbar-title';

import AppBar_Auth from './AppBar_Auth.jsx'
import AppBar_Language from './AppBar_Language.jsx'
import AppBar_NavigationMenu from './AppBar_NavigationMenu.jsx'
import RawMUITheme from '../styles/RawMUITheme.js'


class Chrome extends React.Component
{
  getChildContext( )
  {
    return ( {
      muiTheme: getMuiTheme(
        RawMUITheme,
        {
          avatar: { borderColor: null, },
          userAgent: navigator.userAgent,
        }
      ),
    } );
  }

  _handle_onTouchTap_IncompleteTODOs = ( ) =>
  {
    this.context.router.push( '/ToDos/active' );
  }

  render( )
  {
    let incompleteCount = this.props.Viewer.ToDo_TotalCount - this.props.Viewer.ToDo_CompletedCount;

    let incompleteNotification = [ ];

    if( incompleteCount > 0 )
      incompleteNotification.push(
        <Badge key="top-incomplete" style={ { marginTop: -11, marginBottom: -17 } } badgeContent={ incompleteCount } primary={ true } badgeStyle={{top:20, right:16}}>
          <IconButton tooltip="Incomplete TODOs" onTouchTap={ this._handle_onTouchTap_IncompleteTODOs }>
            <IconNotificationsEventAvailable />
          </IconButton>
        </Badge>
      );

    return (
      <AppCanvas>
        <Helmet
          title="Isomorphic Material Relay Starter Kit"
          meta={ [
            { name : "description", content: "Starter kit featuring Cassandra, Relay, React, Material-UI" },
          ] }
        />
        <ToolBar
          style={ {
            color: RawMUITheme.palette.primary1Color,
            textColor: RawMUITheme.palette.alternateTextColor,
            backgroundColor: ColorManipulator.darken( RawMUITheme.palette.accent2Color, 0.05 ),
          } }
        >
          <ToolbarGroup firstChild={true} float="left">
            <AppBar_NavigationMenu />
          </ToolbarGroup>
          <ToolbarGroup float="left">
            <ToolbarTitle text="IMRSK" />
          </ToolbarGroup>
          <ToolbarGroup float="right">
            { incompleteNotification }
            <ToolbarSeparator />
            <AppBar_Auth Viewer={this.props.Viewer} />
            <AppBar_Language Viewer={this.props.Viewer} />
          </ToolbarGroup>
        </ToolBar>

        <div style={ { paddingTop: 10, paddingLeft: 4, paddingRight: 4, } }>
          {this.props.children}
        </div>

      </AppCanvas>
    )
  }
};

//

Chrome.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

Chrome.childContextTypes = {
  muiTheme: React.PropTypes.object,
};

export default Relay.createContainer( Chrome, {
  fragments: {
    Viewer: () => Relay.QL`
      fragment on Viewer {
        ToDo_TotalCount,
        ToDo_CompletedCount,
        ${AppBar_Auth.getFragment('Viewer')},
      }
    `,
  },
});
