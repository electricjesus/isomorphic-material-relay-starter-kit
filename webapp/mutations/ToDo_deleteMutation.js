import Relay from 'react-relay';

export default class ToDo_deleteMutation extends Relay.Mutation {
  static fragments = {
    // TODO: Mark complete as optional
    todo: () => Relay.QL`
      fragment on ToDo {
        complete,
        id,
      }
    `,
    // TODO: Mark completedCount and totalCount as optional
    viewer: () => Relay.QL`
      fragment on User {
        completedCount,
        id,
        totalCount,
      }
    `,
  };
  getMutation() {
    return Relay.QL`mutation{ToDo_delete}`;
  }
  getFatQuery() {
    return Relay.QL`
      fragment on ToDo_deletePayload {
        deletedToDoId,
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
      connectionName: 'ToDos',
      deletedIDFieldName: 'deletedToDoId',
    }];
  }
  getVariables() {
    return {
      id: this.props.todo.id,
    };
  }
  getOptimisticResponse() {
    var viewerPayload = {id: this.props.viewer.id};
    if (this.props.viewer.completedCount != null) {
      viewerPayload.completedCount = this.props.todo.complete === true ?
        this.props.viewer.completedCount - 1 :
        this.props.viewer.completedCount;
    }
    if (this.props.viewer.totalCount != null) {
      viewerPayload.totalCount = this.props.viewer.totalCount - 1;
    }
    return {
      deletedToDoId: this.props.todo.id,
      viewer: viewerPayload,
    };
  }
}
