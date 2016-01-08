import Relay from 'react-relay';

export default class ToDo_addMutation extends Relay.Mutation {
  static fragments = {
    viewer: () => Relay.QL`
      fragment on User {
        id,
        totalCount,
      }
    `,
  };
  getMutation() {
    return Relay.QL`mutation{ToDo_add}`;
  }
  getFatQuery() {
    return Relay.QL`
      fragment on ToDo_addPayload {
        todoEdge,
        viewer {
          ToDos,
          totalCount,
        },
      }
    `;
  }
  getConfigs() {
    return [{
      type: 'RANGE_ADD',
      parentName: 'viewer',
      parentID: this.props.viewer.id,
      connectionName: 'ToDos',
      edgeName: 'todoEdge',
      rangeBehaviors: {
        '': 'append',
        'status(any)': 'append',
        'status(active)': 'append',
        'status(completed)': null,
      },
    }];
  }
  getVariables() {
    return {
      text: this.props.text,
    };
  }
  getOptimisticResponse() {
    return {
      // FIXME: totalCount gets updated optimistically, but this edge does not
      // get added until the server responds
      todoEdge: {
        node: {
          complete: false,
          text: this.props.text,
        },
      },
      viewer: {
        id: this.props.viewer.id,
        totalCount: this.props.viewer.totalCount + 1,
      },
    };
  }
}
