import Relay from 'react-relay';

export default class ToDo_list_deleteCompletedMutation extends Relay.Mutation {
  static fragments = {
    // TODO: Make completedCount, edges, and totalCount optional
    todos: () => Relay.QL`
      fragment on ToDoConnection {
        edges {
          node {
            complete,
            id,
          },
        },
      }
    `,
    viewer: () => Relay.QL`
      fragment on User {
        completedCount,
        id,
        totalCount,
      }
    `,
  };
  getMutation() {
    return Relay.QL`mutation{ToDo_list_deleteCompleted}`;
  }
  getFatQuery() {
    return Relay.QL`
      fragment on ToDo_list_deleteCompletedPayload {
        deletedToDoIds,
        viewer {
          completedCount,
          totalCount,
        },
      }
    `;
  }
  getConfigs() {
    return [{
      type: 'NODE_DELETE',
      parentName: 'viewer',
      parentID: this.props.viewer.id,
      connectionName: 'todos',
      deletedIDFieldName: 'deletedToDoIds',
    }];
  }
  getVariables() {
    return {};
  }
  getOptimisticResponse() {
    var deletedToDoIds;
    var newTotalCount;
    if (this.props.todos && this.props.todos.edges) {
      deletedToDoIds = this.props.todos.edges
        .filter(edge => edge.node.complete)
        .map(edge => edge.node.id);
    }
    var {completedCount, totalCount} = this.props.viewer;
    if (completedCount != null && totalCount != null) {
      newTotalCount = totalCount - completedCount;
    }
    return {
      deletedToDoIds,
      viewer: {
        completedCount: 0,
        id: this.props.viewer.id,
        totalCount: newTotalCount,
      },
    };
  }
}
