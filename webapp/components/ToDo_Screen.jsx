import React from 'react';
import Relay from 'react-relay';

import Card from 'material-ui/lib/card/card';
import CardHeader from 'material-ui/lib/card/card-header';
import TextField from 'material-ui/lib/text-field';

import AddTodoMutation from '../mutations/AddTodoMutation';

class ToDo_Screen extends React.Component
{
  _handleAddToDo( )
  {
    Relay.Store.update(
      new AddTodoMutation( {
        text: this.refs.addToDo.getValue( ),
        viewer: this.props.viewer
      } )
    );

    this.refs.addToDo.setValue( '' );
  }

  render( )
  {
    return (
      <Card style={ { margin: 5 } }>

        <CardHeader title="TO DOs" subtitle="List of TO DOs for user" />

        { this.props.children }

        <TextField
          ref="addToDo"
          floatingLabelText="What needs to be done?"
          fullWidth={ true }
          onEnterKeyDown={ this._handleAddToDo.bind( this ) }
        />

      </Card>
    );
  }
}

export default Relay.createContainer( ToDo_Screen, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        totalCount,
        ${AddTodoMutation.getFragment('viewer')},
      }
    `,
  },
});
