import React from 'react';

import IconMenu from 'material-ui/lib/menus/icon-menu';
import IconButton from 'material-ui/lib/icon-button';
import MenuItem from 'material-ui/lib/menus/menu-item';

import Icon_Flag_BG from '../icons/Icon_Flag_BG.jsx'
import Icon_Flag_DE from '../icons/Icon_Flag_DE.jsx'
import Icon_Flag_FR from '../icons/Icon_Flag_FR.jsx'
import Icon_Flag_IN from '../icons/Icon_Flag_IN.jsx'
import Icon_Flag_US from '../icons/Icon_Flag_US.jsx'

export default class AppBar_Language extends React.Component
{
  _handleLeftMenuTouchTap( e, item )
  {
    console.log( 'Choose language: ' + item.key );
  }

  render( )
  {
    return(
      <IconMenu key="top-language"
        anchorOrigin={ { vertical: "bottom", horizontal: "right" } }
        onItemTouchTap={ this._handleLeftMenuTouchTap.bind( this ) }
        iconButtonElement={
          <IconButton><Icon_Flag_BG /></IconButton>
        }
      >
        <MenuItem key="BG" checked={ true } primaryText="Български" />
        <MenuItem key="DE" leftIcon={ <Icon_Flag_DE /> } primaryText="Deutsch" />
        <MenuItem key="FR" leftIcon={ <Icon_Flag_FR /> } primaryText="Français" />
        <MenuItem key="IN" leftIcon={ <Icon_Flag_IN /> } primaryText="मानक हिन्दी" />
        <MenuItem key="US" leftIcon={ <Icon_Flag_US /> } primaryText="English" />
      </IconMenu>
    );
  }
}
