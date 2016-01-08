import { fromGlobalId, mutationWithClientMutationId } from "graphql-relay";
import { GraphQLString, GraphQLID, GraphQLNonNull } from "graphql";

import { DS_User_get } from '../../data/User';
import { DS_ToDo_add, DS_ToDo_get } from '../../data/ToDo';

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
      resolve: ( {localToDoId}, args, { rootValue: {user_id} } ) => {
        var todo = DS_ToDo_get(localToDoId);
        return {
          cursor: cursorForObjectInConnection( DS_ToDo_list_get( user_id ), todo ),
          node: todo,
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
