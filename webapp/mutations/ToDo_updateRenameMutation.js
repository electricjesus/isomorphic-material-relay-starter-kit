import Relay from 'react-relay';

export default class ToDo_updateRenameMutation extends Relay.Mutation {
  static fragments = {
    todo: () => Relay.QL`
      fragment on ToDo {
        id,
      }
    `,
  };
  getMutation() {
    return Relay.QL`mutation{ToDo_updateRename}`;
  }
  getFatQuery() {
    return Relay.QL`
      fragment on ToDo_updateRenamePayload {
        todo {
          text,
        }
      }
    `;
  }
  getConfigs() {
    return [{
      type: 'FIELDS_CHANGE',
      fieldIDs: {
        todo: this.props.todo.id,
      },
    }];
  }
  getVariables() {
    return {
      id: this.props.todo.id,
      text: this.props.text,
    };
  }
  getOptimisticResponse() {
    return {
      todo: {
        id: this.props.todo.id,
        text: this.props.text,
      },
    };
  }
}
