import Relay from 'react-relay';

export default class ToDo_list_deleteCompletedMutation extends Relay.Mutation {
  static fragments = {
    // TODO: Make completedCount, edges, and totalCount optional
    ToDos: () => Relay.QL`
      fragment on ToDosConnection {
        edges {
          node {
            complete,
            id,
          },
        },
      }
    `,
    Viewer: () => Relay.QL`
      fragment on Viewer {
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
        Viewer {
          completedCount,
          totalCount,
        },
      }
    `;
  }
  getConfigs() {
    return [{
      type: 'NODE_DELETE',
      parentName: 'Viewer',
      parentID: this.props.Viewer.id,
      connectionName: 'ToDos',
      deletedIDFieldName: 'deletedToDoIds',
    }];
  }
  getVariables() {
    return {};
  }
  getOptimisticResponse() {
    var deletedToDoIds;
    var newTotalCount;
    if (this.props.ToDos && this.props.ToDos.edges) {
      deletedToDoIds = this.props.ToDos.edges
        .filter(edge => edge.node.complete)
        .map(edge => edge.node.id);
    }
    var {completedCount, totalCount} = this.props.Viewer;
    if (completedCount != null && totalCount != null) {
      newTotalCount = totalCount - completedCount;
    }
    return {
      deletedToDoIds,
      Viewer: {
        completedCount: 0,
        id: this.props.Viewer.id,
        totalCount: newTotalCount,
      },
    };
  }
}
