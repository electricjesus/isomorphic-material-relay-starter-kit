import Relay from 'react-relay';

export default class ToDo_updateStatusMutation extends Relay.Mutation {
  static fragments = {
    todo: () => Relay.QL`
      fragment on ToDo {
        id,
      }
    `,
    // TODO: Mark completedCount optional
    Viewer: () => Relay.QL`
      fragment on Viewer {
        id,
        completedCount,
      }
    `,
  };
  getMutation() {
    return Relay.QL`mutation{ToDo_updateStatus}`;
  }
  getFatQuery() {
    return Relay.QL`
      fragment on ToDo_updateStatusPayload {
        todo {
          complete,
        },
        Viewer {
          completedCount,
          ToDos,
        },
      }
    `;
  }
  getConfigs() {
    return [{
      type: 'FIELDS_CHANGE',
      fieldIDs: {
        todo: this.props.todo.id,
        Viewer: this.props.Viewer.id,
      },
    }];
  }
  getVariables() {
    return {
      complete: this.props.complete,
      id: this.props.todo.id,
    };
  }
  getOptimisticResponse() {
    var ViewerPayload = {id: this.props.Viewer.id};
    if (this.props.Viewer.completedCount != null) {
      ViewerPayload.completedCount = this.props.complete ?
        this.props.Viewer.completedCount + 1 :
        this.props.Viewer.completedCount - 1;
    }
    return {
      todo: {
        complete: this.props.complete,
        id: this.props.todo.id,
      },
      Viewer: ViewerPayload,
    };
  }
}
