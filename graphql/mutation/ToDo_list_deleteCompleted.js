import { fromGlobalId, mutationWithClientMutationId } from "graphql-relay";
import { GraphQLString, GraphQLID, GraphQLList, GraphQLNonNull } from "graphql";

import { DS_User_get } from '../../data/User';
import { DS_ToDo_list_deleteCompleted } from '../../data/ToDo';

import ViewerType from '../type/ViewerType';


export default mutationWithClientMutationId( {
  name: 'ToDo_list_deleteCompleted',
  outputFields: {
    deletedToDoIds: {
      type: new GraphQLList( GraphQLString ),
      resolve: ( {deletedToDoIds} ) => deletedToDoIds,
    },
    Viewer: {
      type: ViewerType,
      resolve: ( parent, args, { rootValue: {user_id} } ) => DS_User_get( user_id )
    },
  },
  mutateAndGetPayload: ( input, { rootValue: {user_id} } ) =>
  {
    var deletedToDoLocalIds = DS_ToDo_list_deleteCompleted( user_id );
    var deletedToDoIds = deletedToDoLocalIds.map( toGlobalId.bind( null, 'ToDo' ) );
    return {deletedToDoIds};
  }
} );
