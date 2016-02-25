/* @flow weak */

import { fromGlobalId, mutationWithClientMutationId } from "graphql-relay";
import { GraphQLString, GraphQLID, GraphQLNonNull } from "graphql";

import { DA_User_get, DA_User_updatePassword } from '../../data/da/User';

import ViewerType from '../type/ViewerType';


export default mutationWithClientMutationId( {
  name: 'Viewer_updatePassword',
  inputFields: {
    id:              { type: new GraphQLNonNull( GraphQLID ) },
    User_Password:   { type: new GraphQLNonNull( GraphQLString ) },
  },
  outputFields: {
    Viewer: {
      type: ViewerType,
      resolve: ( {localId}, { ...args }, { rootValue: {user_id} } ) => DA_User_get( user_id, localId ),
    },
  },
  mutateAndGetPayload: ( {
    id,
    User_Password,
  }, { rootValue: {user_id} } ) => {
    var localId = fromGlobalId( id ).id;
    return DA_User_updatePassword(
      user_id,
      localId,
      User_Password,
    )
    .then( ( ) => {
      return {localId};
    } )
    ;
  },
} );
