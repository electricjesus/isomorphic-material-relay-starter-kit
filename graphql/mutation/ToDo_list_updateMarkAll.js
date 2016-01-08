import { fromGlobalId, mutationWithClientMutationId } from "graphql-relay";
import { GraphQLBoolean, GraphQLID, GraphQLList, GraphQLNonNull } from "graphql";

import { DS_User_get } from '../../data/User';
import { DS_ToDo_get, DS_ToDo_list_updateMarkAll } from '../../data/ToDo';

import ToDoType from '../type/ToDoType';
import ViewerType from '../type/ViewerType';


export default mutationWithClientMutationId( {
  name: 'ToDo_list_updateMarkAll',
  inputFields: {
    complete: { type: new GraphQLNonNull( GraphQLBoolean ) },
  },
  outputFields: {
    changedToDos: {
      type: new GraphQLList(ToDoType),
      resolve: ( {changedToDoLocalIds} ) => changedToDoLocalIds.map( DS_ToDo_get ),
    },
    Viewer: {
      type: ViewerType,
      resolve: ( parent, args, { rootValue: {user_id} } ) => DS_User_get( user_id )
    },
  },
  mutateAndGetPayload: ( {complete}, { rootValue: {user_id} } ) =>
  {
    var changedToDoLocalIds = DS_ToDo_list_updateMarkAll( user_id, complete );
    return {changedToDoLocalIds};
  }
} );
