import React from 'react';
import Relay from 'react-relay';

import AddTodoMutation from '../mutations/AddTodoMutation';
import TodoTextInput from './TodoTextInput';

class ToDo_Screen extends React.Component
{

  _handleTextInputSave = (text) => {
    Relay.Store.update(
      new AddTodoMutation({text, viewer: this.props.viewer})
    );
  }

  render( )
  {
    return (
      <div>
        <TodoTextInput
          autoFocus={true}
          className="new-todo"
          onSave={this._handleTextInputSave}
          placeholder="What needs to be done?"
        />

        {this.props.children}

      </div>
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
