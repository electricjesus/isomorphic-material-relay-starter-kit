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
    Viewer: () => Relay.QL`
      fragment on Viewer {
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
      deletedIDFieldName: 'deletedToDoId',
    }];
  }
  getVariables() {
    return {
      id: this.props.todo.id,
    };
  }
  getOptimisticResponse() {
    var ViewerPayload = {id: this.props.Viewer.id};
    if (this.props.Viewer.completedCount != null) {
      ViewerPayload.completedCount = this.props.todo.complete === true ?
        this.props.Viewer.completedCount - 1 :
        this.props.Viewer.completedCount;
    }
    if (this.props.Viewer.totalCount != null) {
      ViewerPayload.totalCount = this.props.Viewer.totalCount - 1;
    }
    return {
      deletedToDoId: this.props.todo.id,
      Viewer: ViewerPayload,
    };
  }
}
