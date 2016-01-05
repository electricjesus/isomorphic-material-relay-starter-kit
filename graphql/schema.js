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
  User,
  DS_User_get,
} from '../data/User';

import {
  Todo,
  DS_ToDo_add,
  DS_ToDo_updateStatus,
  DS_ToDo_get,
  DS_ToDo_list_getForUser,
  DS_ToDo_list_updateMarkAllForUser,
  DS_ToDo_list_deleteCompletedForUser,
  DS_ToDo_deleteForUser,
  DS_ToDo_updateRename,
} from '../data/ToDo';

import {
  Compendium,
  DS_Compendium_add,
  DS_Compendium_update,
  DS_Compendium_get,
  DS_Compendium_list,
} from '../data/Compendium';

var {nodeInterface, nodeField} = nodeDefinitions(
  ( globalId ) =>
  {
    var { type, id } = fromGlobalId( globalId );
    if( type === 'User' ) return DS_User_get( id );

    // ->->->
    else if( type === 'Compendium' ) return DS_Compendium_get( id );
    else if( type === 'Todo' ) return DS_ToDo_get( id );
    // <-<-<-

    else return null;
  },
  ( obj ) =>
  {
    if( obj instanceof User ) return GraphQLUser;

    // ->->->
    else if( obj instanceof Compendium ) return GraphQLCompendium;
    else if( obj instanceof Todo ) return GraphQLTodo;
    // <-<-<-

    else return null;
  }
);

// ->->-> Compendium object type, connection and edge

var GraphQLCompendium = new GraphQLObjectType({
  name: 'Compendium',
  fields: {
    id: globalIdField( 'Compendium' ),
    CompText1: {
      type: GraphQLString,
      resolve: (obj) => obj.CompText1,
    },
    CompText2: {
      type: GraphQLString,
      resolve: (obj) => obj.CompText2,
    },
    CompText3: {
      type: GraphQLString,
      resolve: (obj) => obj.CompText3,
    },
  },
  interfaces: [nodeInterface]
});

var {
  connectionType: CompendiumsConnection,
  edgeType: GraphQLCompendiumEdge,
} = connectionDefinitions({
  name: 'Compendium',
  nodeType: GraphQLCompendium,
});

// <-<-<- Compendium object type, connection and edge

// ->->-> Todo object type, connection and edge

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

// <-<-<- Todo object type, connection and edge

var GraphQLUser = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: globalIdField('User'),

    // ->->-> Compendium access through user

    compendiums: {
      type: CompendiumsConnection,
      args: { ...connectionArgs },
      resolve: ( obj, { ...args }, { rootValue: {user_id} } ) => connectionFromArray( DS_Compendium_list( user_id ), args )
    },

    // <-<-<- Compendium access through user

    // ->->-> Todo access through user

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

    // <-<-<- Todo access through user
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


// ->->-> Compendium mutation definitions

var GQLM_Compendium_update = mutationWithClientMutationId({
  name: 'Compendium_update',
  inputFields: {
    CompText1: { type: new GraphQLNonNull( GraphQLString ) },
    CompText2: { type: new GraphQLNonNull( GraphQLString ) },
    CompText3: { type: new GraphQLNonNull( GraphQLString ) },
    id: { type: new GraphQLNonNull( GraphQLID ) },
  },
  outputFields: {
    Compendium: {
      type: GraphQLCompendium,
      resolve: ( {localCompendiumId} ) => DS_Compendium_get( localCompendiumId ),
    },
  },
  mutateAndGetPayload: ( { id, CompText1, CompText2, CompText3 } ) => {
    var localTodoId = fromGlobalId( id ).id;
    DS_Compendium_update( localTodoId, CompText1, CompText2, CompText3 );
    return {localTodoId};
  },
});

// <-<-<- Compendium mutation definitions


// ->->-> Todo mutation definitions

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
    var localTodoId = DS_ToDo_add( user_id, text, false );
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
    var changedTodoLocalIds = DS_ToDo_list_updateMarkAllForUser( user_id, complete );
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

// <-<-<- Todo mutation definitions

var Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {

    // ->->-> Compendium mutation declarations

    Compendium_update: GQLM_Compendium_update,

    // <-<-<- Compendium mutation declarations

    // ->->-> Todo mutation declarations

    addTodo: GraphQLAddTodoMutation,
    changeTodoStatus: GraphQLChangeTodoStatusMutation,
    markAllTodos: GraphQLMarkAllTodosMutation,
    removeCompletedTodos: GraphQLRemoveCompletedTodosMutation,
    removeTodo: GraphQLRemoveTodoMutation,
    renameTodo: GraphQLRenameTodoMutation,

    // <-<-<- Todo mutation declarations
  },
});

export var schema = new GraphQLSchema( {
  query: GraphQL_Root,
  mutation: Mutation
} );
