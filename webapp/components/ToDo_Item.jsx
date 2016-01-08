import React from 'react';
import Relay from 'react-relay';

import Checkbox from 'material-ui/lib/checkbox';
import IconButton from 'material-ui/lib/icon-button';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import ListItem from 'material-ui/lib/lists/list-item';
import MenuItem from 'material-ui/lib/menus/menu-item';
import NavigationMoreVert from 'material-ui/lib/svg-icons/navigation/more-vert';

import ToDo_updateStatusMutation from '../mutations/ToDo_updateStatusMutation';
import ToDo_deleteMutation from '../mutations/ToDo_deleteMutation';
import ToDo_updateRenameMutation from '../mutations/ToDo_updateRenameMutation';

class ToDo_Item extends React.Component
{
  state =
  {
    isEditing: false,
  };

  _handleCompletedCheck( event, complete )
  {
    Relay.Store.update(
      new ToDo_updateStatusMutation({
        complete,
        todo: this.props.todo,
        viewer: this.props.viewer,
      })
    );
  }

  _handleTextInputSave( text )
  {
    Relay.Store.update(
      new ToDo_updateRenameMutation({todo: this.props.todo, text})
    );
  }

  _ToDo_delete( )
  {
    Relay.Store.update(
      new ToDo_deleteMutation({todo: this.props.todo, viewer: this.props.viewer})
    );
  }

  _handleTouchTap( e, item )
  {
    switch( item.ref )
    {
      case 'edit':
        console.log( 'edit' );
        //this.props.onCompleteToDo(this.props.todo.id);
        break;
      case 'delete':
        console.log( 'delete' );
        this._ToDo_delete( );
        break;
      default:
        break;
    }
  }

  render( )
  {
    let rightIconMenu = (
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
        primaryText={ this.props.todo.text }
        leftCheckbox={
          <Checkbox
            defaultChecked={ this.props.todo.complete }
            onCheck={ this._handleCompletedCheck.bind( this ) }
          />
        }
        rightIconButton={ rightIconMenu }
      />
    );
  }
}

export default Relay.createContainer( ToDo_Item, {
  fragments: {
    todo: () => Relay.QL`
      fragment on ToDo {
        complete,
        id,
        text,
        ${ToDo_updateStatusMutation.getFragment('todo')},
        ${ToDo_deleteMutation.getFragment('todo')},
        ${ToDo_updateRenameMutation.getFragment('todo')},
      }
    `,
    viewer: () => Relay.QL`
      fragment on User {
        ${ToDo_updateStatusMutation.getFragment('viewer')},
        ${ToDo_deleteMutation.getFragment('viewer')},
      }
    `,
  },
} );
