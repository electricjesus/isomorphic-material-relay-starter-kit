import { fromGlobalId, mutationWithClientMutationId } from "graphql-relay";
import { GraphQLBoolean, GraphQLID, GraphQLNonNull } from "graphql";

import { DS_User_get } from '../../data/User';
import { DS_ToDo_get, DS_ToDo_updateStatus } from '../../data/ToDo';

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
      resolve: ( {localToDoId} ) => DS_ToDo_get( localToDoId ),
    },
    Viewer: {
      type: ViewerType,
      resolve: ( parent, args, { rootValue: {user_id} } ) => DS_User_get( user_id )
    },
  },
  mutateAndGetPayload: ( { id, complete } ) => {
    var localToDoId = fromGlobalId(id).id;
    DS_ToDo_updateStatus( localToDoId, complete );
    return {localToDoId};
  },
} );
