import { fromGlobalId, mutationWithClientMutationId } from "graphql-relay";
import { GraphQLBoolean, GraphQLID, GraphQLNonNull } from "graphql";

import { DA_User_get } from '../../data/da/User';
import { DA_ToDo_get, DA_ToDo_update } from '../../data/da/ToDo';

import ToDoType from '../type/ToDoType';
import ViewerType from '../type/ViewerType';


export default mutationWithClientMutationId( {
  name: 'ToDo_updateStatus',
  inputFields: {
    complete: { type: new GraphQLNonNull( GraphQLBoolean ) },
    id: { type: new GraphQLNonNull( GraphQLID ) },
  },
  outputFields: {
    todo: {
      type: ToDoType,
      resolve: ( {localToDoId} ) => DA_ToDo_get( localToDoId ),
    },
    Viewer: {
      type: ViewerType,
      resolve: ( parent, args, { rootValue: {user_id} } ) => DA_User_get( user_id )
    },
  },
  mutateAndGetPayload: ( { id, complete } ) => {
    var localToDoId = fromGlobalId(id).id;
    DA_ToDo_update( localToDoId, { complete: complete } );
    return {localToDoId};
  },
} );
