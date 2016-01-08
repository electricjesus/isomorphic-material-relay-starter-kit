import Relay from 'react-relay';

export default class ToDo_list_updateMarkAllMutation extends Relay.Mutation {
  static fragments = {
    // TODO: Mark edges and totalCount optional
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
        id,
        totalCount,
      }
    `,
  };
  getMutation() {
    return Relay.QL`mutation{ToDo_list_updateMarkAll}`;
  }
  getFatQuery() {
    return Relay.QL`
      fragment on ToDo_list_updateMarkAllPayload {
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
        Viewer: this.props.Viewer.id,
      },
    }];
  }
  getVariables() {
    return {
      complete: this.props.complete,
    };
  }
  getOptimisticResponse() {
    var ViewerPayload = {id: this.props.Viewer.id};
    if (this.props.ToDos && this.props.ToDos.edges) {
      ViewerPayload.ToDos = {
        edges: this.props.ToDos.edges
          .filter(edge => edge.node.complete !== this.props.complete)
          .map(edge => ({
            node: {
              complete: this.props.complete,
              id: edge.node.id,
            },
          }))
      };
    }
    if (this.props.Viewer.totalCount != null) {
      ViewerPayload.completedCount = this.props.complete ?
        this.props.Viewer.totalCount :
        0;
    }
    return {
      Viewer: ViewerPayload,
    };
  }
}
