import { fromGlobalId, mutationWithClientMutationId } from "graphql-relay";
import { GraphQLString, GraphQLID, GraphQLNonNull } from "graphql";

import { DA_User_get } from '../../data/da/User';
import { DA_ToDo_get, DA_ToDo_update } from '../../data/da/ToDo';

import ToDoType from '../type/ToDoType';

export default mutationWithClientMutationId( {
  name: 'ToDo_updateRename',
  inputFields: {
    id: { type: new GraphQLNonNull( GraphQLID ) },
    text: { type: new GraphQLNonNull( GraphQLString ) },
  },
  outputFields: {
    ToDo: {
      type: ToDoType,
      resolve: ( {localToDoId} ) => DA_ToDo_get(localToDoId),
    }
  },
  mutateAndGetPayload: ( {id, text} ) => {
    var localToDoId = fromGlobalId(id).id;
    DA_ToDo_update( localToDoId, { text: text } );
    return {localToDoId};
  },
} );
