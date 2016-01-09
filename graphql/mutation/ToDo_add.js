import { fromGlobalId, mutationWithClientMutationId, cursorForObjectInConnection } from "graphql-relay";
import { GraphQLString, GraphQLID, GraphQLNonNull } from "graphql";

import { DS_User_get } from '../../data/User';
import { DS_ToDo_add, DS_ToDo_get, DS_ToDo_list_get } from '../../data/ToDo';

import ToDosConnection from '../type/ToDosConnection';
import ViewerType from '../type/ViewerType';


export default mutationWithClientMutationId( {
  name: 'ToDo_add',
  inputFields: {
    text: { type: new GraphQLNonNull( GraphQLString ) }
  },
  outputFields: {
    ToDosEdge: {
      type: ToDosConnection.edgeType,
      resolve: ( {localToDoId}, args, { rootValue: {user_id} } ) =>
      {
        console.log( 'ToDo_add ToDosEdge, userid = ' + user_id );
        let a_ToDo = DS_ToDo_get( localToDoId );
        console.log( 'ToDo_add ToDosEdge, a_ToDo = ' + JSON.stringify( a_ToDo ) );
        return {
          cursor: cursorForObjectInConnection( DS_ToDo_list_get( user_id ), a_ToDo ),
          node: a_ToDo,
        };
      }
    },
    Viewer: {
      type: ViewerType,
      resolve: ( parent, args, { rootValue: {user_id} } ) => DS_User_get( user_id )
    },
  },
  mutateAndGetPayload: ( {text}, { rootValue: {user_id} } ) =>
  {
    var localToDoId = DS_ToDo_add( user_id, text, false );
    return {localToDoId};
  }
} );
