import Relay from 'react-relay';

export default class Ensayo_addMutation extends Relay.Mutation {
  static fragments = {
    Viewer: () => Relay.QL`
      fragment on Viewer {
        id,
      }
    `,
  };
  getMutation() {
    return Relay.QL`mutation{Ensayo_add}`;
  }
  getFatQuery() {
    return Relay.QL`
      fragment on Ensayo_addPayload {
        EnsayosEdge,
        Viewer {
          Ensayos,
        },
      }
    `;
  }
  getConfigs() {
    return [{
      type: 'RANGE_ADD',
      parentName: 'Viewer',
      parentID: this.props.Viewer.id,
      connectionName: 'Ensayos',
      edgeName: 'EnsayosEdge',
      rangeBehaviors: {
        '': 'append',
      },
    }];
  }
  getVariables() {
    return {
      Ensayo_Content: this.props.Ensayo_Content,
      Ensayo_Title: this.props.Ensayo_Title,
      Ensayo_Keywords: this.props.Ensayo_Keywords,
    };
  }
  getOptimisticResponse() {
    return {
      EnsayosEdge: {
        node: {
          Ensayo_Content: this.props.Ensayo_Content,
          Ensayo_Title: this.props.Ensayo_Title,
          Ensayo_Keywords: this.props.Ensayo_Keywords,
        },
      },
      Viewer: {
        id: this.props.Viewer.id,
      },
    };
  }
}
