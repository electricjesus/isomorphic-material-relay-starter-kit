import { fromGlobalId, mutationWithClientMutationId } from "graphql-relay";
import { GraphQLString, GraphQLID, GraphQLNonNull } from "graphql";

import { DS_User_get } from '../../data/User';
import { DS_ToDo_get, DS_ToDo_updateRename } from '../../data/ToDo';

import ToDoType from '../type/ToDoType';

export default mutationWithClientMutationId( {
  name: 'ToDo_updateRename',
  inputFields: {
    id: { type: new GraphQLNonNull( GraphQLID ) },
    text: { type: new GraphQLNonNull( GraphQLString ) },
  },
  outputFields: {
    todo: {
      type: ToDoType,
      resolve: ( {localToDoId} ) => DS_ToDo_get(localToDoId),
    }
  },
  mutateAndGetPayload: ( {id, text} ) => {
    var localToDoId = fromGlobalId(id).id;
    DS_ToDo_updateRename( localToDoId, text );
    return {localToDoId};
  },
} );
