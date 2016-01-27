import React from 'react';
import Relay from 'react-relay';

import IconButton from 'material-ui/lib/icon-button';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import ListItem from 'material-ui/lib/lists/list-item';
import MenuItem from 'material-ui/lib/menus/menu-item';
import NavigationMoreVert from 'material-ui/lib/svg-icons/navigation/more-vert';

import Translaticiarum_deleteMutation from '../mutations/Translaticiarum_deleteMutation';
import Translaticiarum_updateMutation from '../mutations/Translaticiarum_updateMutation';

class Translaticiarum_Item extends React.Component
{
  /*
  _handleTextInputSave( Translaticiarum_Time, Translaticiarum_Type )
  {
    Relay.Store.commitUpdate(
      new Translaticiarum_updateMutation({Translaticiarum: this.props.Translaticiarum, Translaticiarum_Time, Translaticiarum_Type })
    );
  }
  */

  _Translaticiarum_delete( )
  {
    Relay.Store.commitUpdate(
      new Translaticiarum_deleteMutation({Translaticiarum: this.props.Translaticiarum, Viewer: this.props.Viewer})
    );
  }

  _handleTouchTap( e, item )
  {
    switch( item.ref )
    {
      case 'edit':
        console.log( 'edit' );
        //this.props.onCompleteTranslaticiarum(this.props.Translaticiarum.id);
        break;
      case 'delete':
        console.log( 'delete' );
        this._Translaticiarum_delete( );
        break;
      default:
        break;
    }
  }

  render( )
  {
    const theDate = new Date( this.props.Translaticiarum.Translaticiarum_Date );
    const theTime = new Date( this.props.Translaticiarum.Translaticiarum_Time );
    const theDateTime = new Date( theDate.getTime( ) + theTime.getTime( ) );

    const rightIconMenu = (
      <IconMenu
        iconButtonElement={<IconButton><NavigationMoreVert /></IconButton>}
        onItemTouchTap={ this._handleTouchTap.bind( this ) }
      >
        <MenuItem ref="edit" index={0}>Edit</MenuItem>
        <MenuItem ref="delete" index={1}>Delete</MenuItem>
      </IconMenu>
    );

    return (
      <ListItem
        primaryText={ theDateTime.toString( ) }
        rightIconButton={ rightIconMenu }
      />
    );
  }
}

export default Relay.createContainer( Translaticiarum_Item, {
  fragments: {
    Translaticiarum: () => Relay.QL`
      fragment on Translaticiarum {
        id,
        Translaticiarum_Date,
        Translaticiarum_Time,
        Translaticiarum_Type,
        ${Translaticiarum_deleteMutation.getFragment('Translaticiarum')},
        ${Translaticiarum_updateMutation.getFragment('Translaticiarum')},
      }
    `,
  },
} );
