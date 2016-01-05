import Relay from 'react-relay';

export default class Compendium_updateMutation extends Relay.Mutation
{
  static fragments = {
    Compendium: ( ) => Relay.QL`
      fragment on Compendium {
        id,
      }
    `,
  };
  getMutation( ) {
    return Relay.QL`mutation{Compendium_update}`;
  }
  getFatQuery( ) {
    return Relay.QL`
      fragment on Compendium_updatePayload {
        Compendium {
          CompText1,
          CompText2,
          CompText3,
        }
      }
    `;
  }
  getConfigs( ) {
    return [{
      type: 'FIELDS_CHANGE',
      fieldIDs: {
        Compendium: this.props.Compendium.id,
      },
    }];
  }
  getVariables( ) {
    return {
      id: this.props.Compendium.id,
      CompText1: this.props.CompText1,
      CompText2: this.props.CompText2,
      CompText3: this.props.CompText3,
    };
  }
  getOptimisticResponse( ) {
    return {
      Compendium: {
        id: this.props.Compendium.id,
        CompText1: this.props.CompText1,
        CompText2: this.props.CompText2,
        CompText3: this.props.CompText3,
      },
    };
  }
}
