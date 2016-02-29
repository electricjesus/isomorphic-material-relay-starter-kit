/* @flow weak */

import Helmet from "react-helmet";
import React from 'react';
import Relay from 'react-relay';

import AppCanvas from 'material-ui/lib/app-canvas';
import Badge from 'material-ui/lib/badge';
import ColorManipulator from 'material-ui/lib/utils/color-manipulator';
import getMuiTheme from 'material-ui/lib/styles/getMuiTheme';
import IconButton from 'material-ui/lib/icon-button';
import IconNotificationsEventAvailable from 'material-ui/lib/svg-icons/notification/event-available';
import LeftNav from 'material-ui/lib/left-nav';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import NavigationMoreVert from 'material-ui/lib/svg-icons/navigation/more-vert';
import {SelectableContainerEnhance} from 'material-ui/lib/hoc/selectable-enhance';
import ToolBar from 'material-ui/lib/toolbar/toolbar';
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group';
import ToolbarSeparator from 'material-ui/lib/toolbar/toolbar-separator';
import ToolbarTitle from 'material-ui/lib/toolbar/toolbar-title';

const SelectableList = SelectableContainerEnhance(List);

import AppBar_Auth from './AppBar_Auth.jsx';
import AppBar_Language from './AppBar_Language.jsx';
import RawMUITheme from '../styles/RawMUITheme.js';


class Chrome extends React.Component
{
  constructor( props )
  {
    super( props );

    this.state = {
      leftNavOpen: false,
    };
  }

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

  _handle_onTouchTap_NavigationToggle = ( ) =>
  {
    this._handle_onRequestChange( ! this.state.leftNavOpen );
  };

  _handle_onRequestChange = ( open ) =>
  {
    this.setState( {
      leftNavOpen: open,
    } );
  };

  _handle_onRequestChangeList = ( event, value ) =>
  {
    this.context.router.push( value );
    this._handle_onTouchTap_NavigationToggle( );
  };

  render( )
  {

    // TODO Temporary example how to modify the menu depending on whether the user has logged in or not.
    // Later integrate with example of requesting login and
    // https://github.com/codefoundries/isomorphic-material-relay-starter-kit/issues/36
    let systemMenuContents = [
      <ListItem primaryText="Home" value="/" />,
    ];

    if( ! this.props.Viewer.User_IsAnonymous )
      systemMenuContents.push( <ListItem primaryText="User Profile" value="/User" /> );

    return (
      <AppCanvas>
        <Helmet
          title="Isomorphic Material Relay Starter Kit"
          meta={ [
            { name : "description", content: "Starter kit featuring Cassandra, Relay, React, Material-UI" },
          ] }
        />
        <LeftNav
          open={ this.state.leftNavOpen }
          style={ { marginTop: 56, } }
          onRequestChange={ this._handle_onRequestChange }
        >
          <SelectableList
            valueLink={ { value: location.pathname, requestChange: this._handle_onRequestChangeList } }
          >
            <ListItem
              primaryText="System"
              primaryTogglesNestedList={true}
              nestedItems={ systemMenuContents }
            />
            <ListItem
              primaryText="Examples"
              primaryTogglesNestedList={true}
              nestedItems={ [
                <ListItem primaryText="Checklists" value="/checklists" />,
              ] }
            />
          </SelectableList>
        </LeftNav>
        <ToolBar
          style={ {
            zIndex: 2,
            position: 'fixed',
            backgroundColor: RawMUITheme.palette.accent2Color,
          } }
        >
          <ToolbarGroup firstChild={true} float="left">
            <IconButton key="top-menu" onTouchTap={ this._handle_onTouchTap_NavigationToggle }>
              <NavigationMoreVert />
            </IconButton>
          </ToolbarGroup>
          <ToolbarGroup float="left">
            <ToolbarTitle text="IMRSK" />
          </ToolbarGroup>
          <ToolbarGroup float="right">            
            <ToolbarSeparator />
            <AppBar_Auth Viewer={this.props.Viewer} />
            <AppBar_Language Viewer={this.props.Viewer} />
          </ToolbarGroup>
        </ToolBar>

        <div style={ { paddingTop: 60, paddingLeft: 4, paddingRight: 4, } }>
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

// It is important to retrieve User_AuthToken, since it is used in app.js
export default Relay.createContainer( Chrome, {
  fragments: {
    Viewer: () => Relay.QL`
      fragment on Viewer {
        User_IsAnonymous,
        User_AuthToken,
        ${AppBar_Auth.getFragment('Viewer')},
      }
    `,
  },
});
