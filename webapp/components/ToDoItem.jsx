import React from 'react';
import Relay from 'react-relay';

import Checkbox from 'material-ui/lib/checkbox';
import IconButton from 'material-ui/lib/icon-button';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import ListItem from 'material-ui/lib/lists/list-item';
import MenuItem from 'material-ui/lib/menus/menu-item';
import NavigationMoreVert from 'material-ui/lib/svg-icons/navigation/more-vert';

import ChangeTodoStatusMutation from '../mutations/ChangeTodoStatusMutation';
import RemoveTodoMutation from '../mutations/RemoveTodoMutation';
import RenameTodoMutation from '../mutations/RenameTodoMutation';

class ToDoItem extends React.Component
{
  state =
  {
    isEditing: false,
  };

  _handleCompletedCheck( event, complete )
  {
    Relay.Store.update(
      new ChangeTodoStatusMutation({
        complete,
        todo: this.props.todo,
        viewer: this.props.viewer,
      })
    );
  }

  _handleTextInputSave( text )
  {
    Relay.Store.update(
      new RenameTodoMutation({todo: this.props.todo, text})
    );
  }

  _removeTodo( )
  {
    Relay.Store.update(
      new RemoveTodoMutation({todo: this.props.todo, viewer: this.props.viewer})
    );
  }

  _handleTouchTap( e, item )
  {
    switch( item.ref )
    {
      case 'edit':
        console.log( 'edit' );
        //this.props.onCompleteTodo(this.props.todo.id);
        break;
      case 'delete':
        console.log( 'delete' );
        this._removeTodo( );
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

export default Relay.createContainer( ToDoItem, {
  fragments: {
    todo: () => Relay.QL`
      fragment on Todo {
        complete,
        id,
        text,
        ${ChangeTodoStatusMutation.getFragment('todo')},
        ${RemoveTodoMutation.getFragment('todo')},
        ${RenameTodoMutation.getFragment('todo')},
      }
    `,
    viewer: () => Relay.QL`
      fragment on User {
        ${ChangeTodoStatusMutation.getFragment('viewer')},
        ${RemoveTodoMutation.getFragment('viewer')},
      }
    `,
  },
} );
