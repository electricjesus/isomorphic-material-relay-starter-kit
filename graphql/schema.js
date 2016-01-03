import {
  GraphQLBoolean,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql';

import {
  connectionArgs,
  connectionDefinitions,
  connectionFromArray,
  cursorForObjectInConnection,
  fromGlobalId,
  globalIdField,
  mutationWithClientMutationId,
  nodeDefinitions,
  toGlobalId,
} from 'graphql-relay';

import {
  Todo,
  User,
  DS_ToDo_add,
  DS_ToDo_statusUpdate,
  DS_ToDo_get,
  DS_ToDo_list_getForUser,
  DS_User_get,
  DO_ToDo_list_updateMarkAllForUser,
  DS_ToDo_list_deleteCompletedForUser,
  DS_ToDo_deleteForUser,
  DS_ToDo_updateRename,
} from './database';

var {nodeInterface, nodeField} = nodeDefinitions(
  ( globalId ) => {
    var { type, id } = fromGlobalId( globalId );
    if( type === 'Todo' )
      return DS_ToDo_get( id );
    else if( type === 'User' )
      return DS_User_get( id );
    else
      return null;
  },
  ( obj ) => {
    if( obj instanceof Todo )
      return GraphQLTodo;
    else if( obj instanceof User )
      return GraphQLUser;
    else
      return null;
  }
);

var GraphQLTodo = new GraphQLObjectType({
  name: 'Todo',
  fields: {
    id: globalIdField('Todo'),
    text: {
      type: GraphQLString,
      resolve: (obj) => obj.text,
    },
    complete: {
      type: GraphQLBoolean,
      resolve: (obj) => obj.complete,
    }
  },
  interfaces: [nodeInterface]
});

var {
  connectionType: TodosConnection,
  edgeType: GraphQLTodoEdge,
} = connectionDefinitions({
  name: 'Todo',
  nodeType: GraphQLTodo,
});

var GraphQLUser = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: globalIdField('User'),
    todos: {
      type: TodosConnection,
      args: {
        status: {
          type: GraphQLString,
          defaultValue: 'any',
        },
        ...connectionArgs,
      },
      resolve: ( obj, { status, ...args }, { rootValue: {user_id} } ) => connectionFromArray( DS_ToDo_list_getForUser( user_id, status ), args )
    },
    totalCount: {
      type: GraphQLInt,
      resolve: ( obj, { status, ...args }, { rootValue: {user_id} } ) => DS_ToDo_list_getForUser( user_id ).length
    },
    completedCount: {
      type: GraphQLInt,
      resolve: ( obj, { status, ...args }, { rootValue: {user_id} } ) => DS_ToDo_list_getForUser( user_id, 'completed' ).length
    },
  },
  interfaces: [nodeInterface]
});

var GraphQL_Root = new GraphQLObjectType({
  name: 'Root',
  fields: {
    viewer: {
      type: GraphQLUser,
      resolve: ( parent, args, { rootValue: {user_id} } ) => DS_User_get( user_id )
    },
    node: nodeField
  },
});

var GraphQLAddTodoMutation = mutationWithClientMutationId({
  name: 'AddTodo',
  inputFields: {
    text: { type: new GraphQLNonNull(GraphQLString) }
  },
  outputFields: {
    todoEdge: {
      type: GraphQLTodoEdge,
      resolve: ( {localTodoId}, args, { rootValue: {user_id} } ) => {
        var todo = DS_ToDo_get(localTodoId);
        return {
          cursor: cursorForObjectInConnection( DS_ToDo_list_getForUser( user_id ), todo ),
          node: todo,
        };
      }
    },
    viewer: {
      type: GraphQLUser,
      resolve: ( parent, args, { rootValue: {user_id} } ) => DS_User_get( user_id )
    },
  },
  mutateAndGetPayload: ( {text}, { rootValue: {user_id} } ) =>
  {
    var localTodoId = DS_ToDo_add( user_id, text );
    return {localTodoId};
  }
});

var GraphQLChangeTodoStatusMutation = mutationWithClientMutationId({
  name: 'ChangeTodoStatus',
  inputFields: {
    complete: { type: new GraphQLNonNull( GraphQLBoolean ) },
    id: { type: new GraphQLNonNull( GraphQLID ) },
  },
  outputFields: {
    todo: {
      type: GraphQLTodo,
      resolve: ( {localTodoId} ) => DS_ToDo_get( localTodoId ),
    },
    viewer: {
      type: GraphQLUser,
      resolve: ( parent, args, { rootValue: {user_id} } ) => DS_User_get( user_id )
    },
  },
  mutateAndGetPayload: ( { id, complete } ) => {
    var localTodoId = fromGlobalId(id).id;
    DS_ToDo_statusUpdate( localTodoId, complete );
    return {localTodoId};
  },
});

var GraphQLMarkAllTodosMutation = mutationWithClientMutationId({
  name: 'MarkAllTodos',
  inputFields: {
    complete: { type: new GraphQLNonNull( GraphQLBoolean ) },
  },
  outputFields: {
    changedTodos: {
      type: new GraphQLList(GraphQLTodo),
      resolve: ( {changedTodoLocalIds} ) => changedTodoLocalIds.map( DS_ToDo_get ),
    },
    viewer: {
      type: GraphQLUser,
      resolve: ( parent, args, { rootValue: {user_id} } ) => DS_User_get( user_id )
    },
  },
  mutateAndGetPayload: ( {complete}, { rootValue: {user_id} } ) =>
  {
    var changedTodoLocalIds = DO_ToDo_list_updateMarkAllForUser( user_id, complete );
    return {changedTodoLocalIds};
  }
});

var GraphQLRemoveCompletedTodosMutation = mutationWithClientMutationId({
  name: 'RemoveCompletedTodos',
  outputFields: {
    deletedTodoIds: {
      type: new GraphQLList(GraphQLString),
      resolve: ({deletedTodoIds}) => deletedTodoIds,
    },
    viewer: {
      type: GraphQLUser,
      resolve: ( parent, args, { rootValue: {user_id} } ) => DS_User_get( user_id )
    },
  },
  mutateAndGetPayload: ( input, { rootValue: {user_id} } ) =>
  {
    var deletedTodoLocalIds = DS_ToDo_list_deleteCompletedForUser( user_id );
    var deletedTodoIds = deletedTodoLocalIds.map( toGlobalId.bind( null, 'Todo' ) );
    return {deletedTodoIds};
  }
});

var GraphQLRemoveTodoMutation = mutationWithClientMutationId( {
  name: 'RemoveTodo',
  inputFields: {
    id: { type: new GraphQLNonNull( GraphQLID ) },
  },
  outputFields: {
    deletedTodoId: {
      type: GraphQLID,
      resolve: ({id}) => id,
    },
    viewer: {
      type: GraphQLUser,
      resolve: ( parent, args, { rootValue: {user_id} } ) => DS_User_get( user_id )
    },
  },
  mutateAndGetPayload: ( {id}, { rootValue: {user_id} } ) => {
    var localTodoId = fromGlobalId(id).id;
    DS_ToDo_deleteForUser( user_id, localTodoId );
    return {id};
  }
} );

var GraphQLRenameTodoMutation = mutationWithClientMutationId({
  name: 'RenameTodo',
  inputFields: {
    id: { type: new GraphQLNonNull( GraphQLID ) },
    text: { type: new GraphQLNonNull(GraphQLString) },
  },
  outputFields: {
    todo: {
      type: GraphQLTodo,
      resolve: ({localTodoId}) => DS_ToDo_get(localTodoId),
    }
  },
  mutateAndGetPayload: ({id, text}) => {
    var localTodoId = fromGlobalId(id).id;
    DS_ToDo_updateRename( localTodoId, text );
    return {localTodoId};
  },
});

var Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addTodo: GraphQLAddTodoMutation,
    changeTodoStatus: GraphQLChangeTodoStatusMutation,
    markAllTodos: GraphQLMarkAllTodosMutation,
    removeCompletedTodos: GraphQLRemoveCompletedTodosMutation,
    removeTodo: GraphQLRemoveTodoMutation,
    renameTodo: GraphQLRenameTodoMutation,
  },
});

export var schema = new GraphQLSchema({
  query: GraphQL_Root,
  mutation: Mutation
});
