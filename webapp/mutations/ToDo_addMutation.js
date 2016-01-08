import Relay from 'react-relay';

export default class ToDo_addMutation extends Relay.Mutation {
  static fragments = {
    Viewer: () => Relay.QL`
      fragment on Viewer {
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
        ToDosEdge,
        Viewer {
          ToDos,
          totalCount,
        },
      }
    `;
  }
  getConfigs() {
    return [{
      type: 'RANGE_ADD',
      parentName: 'Viewer',
      parentID: this.props.Viewer.id,
      connectionName: 'ToDos',
      edgeName: 'ToDosEdge',
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
      ToDosEdge: {
        node: {
          complete: false,
          text: this.props.text,
        },
      },
      Viewer: {
        id: this.props.Viewer.id,
        totalCount: this.props.Viewer.totalCount + 1,
      },
    };
  }
}
