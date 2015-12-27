import React from 'react';
import Relay from 'react-relay';

import Card from 'material-ui/lib/card/card';
import Checkbox from 'material-ui/lib/checkbox';
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';

import MarkAllTodosMutation from '../mutations/MarkAllTodosMutation';
import Todo from './Todo';

class TodoList extends React.Component
{
  _handleMarkAllOnCheck( event, checked )
  {
    Relay.Store.update(
      new MarkAllTodosMutation( {
        complete: checked,
        todos: this.props.viewer.todos,
        viewer: this.props.viewer,
      } )
    );
  }

  renderTodos( )
  {
    return this.props.viewer.todos.edges.map(edge =>
      <Todo
        key={edge.node.id}
        todo={edge.node}
        viewer={this.props.viewer}
      />
    );
  }

  _handleTabsChange( value )
  {
    this.context.history.pushState( null, '/todos/' + value );
  }

  renderTabs( )
  {
    return(
      <Tabs valueLink={ { value: this.props.relay.variables.status, requestChange: this._handleTabsChange.bind( this ) } }>
        <Tab label="All" value="any" />
        <Tab label="Active" value="active" />
        <Tab label="Completed" value="completed" />
      </Tabs>
    );
  }

  render( )
  {
    var numTodos = this.props.viewer.totalCount;
    var numCompletedTodos = this.props.viewer.completedCount;
    return (
      <Card>
        { this.renderTabs( ) }
        <Checkbox
          label="Mark all as complete"
          defaultChecked={ numTodos === numCompletedTodos }
          onCheck={ this._handleMarkAllOnCheck.bind( this ) }
        />
        <ul className="todo-list">
          { this.renderTodos( ) }
        </ul>
      </Card>
    );
  }
}

TodoList.contextTypes = {
  history: React.PropTypes.object,
};

export default Relay.createContainer( TodoList, {
  initialVariables:
  {
    status: null,
  },

  prepareVariables( { status } )
  {
    var nextStatus;
    if (status === 'active' || status === 'completed')
      nextStatus = status;
    else
      // This matches the Backbone example, which displays all todos on an
      // invalid route.
      nextStatus = 'any';

    return {
      status: nextStatus,
      limit: 2147483647,
    };
  },

  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        completedCount,
        todos(status: $status, first: $limit) {
          edges {
            node {
              id,
              ${Todo.getFragment('todo')},
            },
          },
          ${MarkAllTodosMutation.getFragment('todos')},
        },
        totalCount,
        ${MarkAllTodosMutation.getFragment('viewer')},
        ${Todo.getFragment('viewer')},
      }
    `,
  },
});
