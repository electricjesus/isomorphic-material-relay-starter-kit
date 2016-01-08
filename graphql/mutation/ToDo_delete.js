import { fromGlobalId, mutationWithClientMutationId } from "graphql-relay";
import { GraphQLID, GraphQLNonNull } from "graphql";

import { DS_User_get } from '../../data/User';
import { DS_ToDo_delete } from '../../data/ToDo';

import ViewerType from '../type/ViewerType';


export default mutationWithClientMutationId( {
  name: 'ToDo_delete',
  inputFields: {
    id: { type: new GraphQLNonNull( GraphQLID ) },
  },
  outputFields: {
    deletedToDoId: {
      type: GraphQLID,
      resolve: ( {id} ) => id,
    },
    Viewer: {
      type: ViewerType,
      resolve: ( parent, args, { rootValue: {user_id} } ) => DS_User_get( user_id )
    },
  },
  mutateAndGetPayload: ( {id}, { rootValue: {user_id} } ) => {
    var localToDoId = fromGlobalId(id).id;
    DS_ToDo_delete( user_id, localToDoId );
    return {id};
  }
} );
