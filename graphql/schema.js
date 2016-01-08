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
  ToDo,
  DS_ToDo_add,
  DS_ToDo_updateStatus,
  DS_ToDo_get,
  DS_ToDo_list_get,
  DS_ToDo_list_updateMarkAll,
  DS_ToDo_list_deleteCompleted,
  DS_ToDo_delete,
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
    else if( type === 'ToDo' ) return DS_ToDo_get( id );
    // <-<-<-

    else return null;
  },
  ( obj ) =>
  {
    if( obj instanceof User ) return GQLOT_User;

    // ->->->
    else if( obj instanceof Compendium ) return GraphQLCompendium;
    else if( obj instanceof ToDo ) return GQLOT_ToDo;
    // <-<-<-

    else return null;
  }
);

// ->->-> Compendium object type, connection and edge

var GraphQLCompendium = new GraphQLObjectType( {
  name: 'Compendium',
  fields: {
    id: globalIdField( 'Compendium' ),
    Compendium_FirstTextInput:          { type: GraphQLString,  resolve: (obj) => obj.Compendium_FirstTextInput, },
    Compendium_RangedNumber:            { type: GraphQLInt,     resolve: (obj) => obj.Compendium_RangedNumber, },
    Compendium_Excitement:              { type: GraphQLInt,     resolve: (obj) => obj.Compendium_Excitement, },
    Compendium_FollowUpQuestion:        { type: GraphQLString,  resolve: (obj) => obj.Compendium_FollowUpQuestion, },
    Compendium_FavoriteMammal:          { type: GraphQLInt,     resolve: (obj) => obj.Compendium_FavoriteMammal, },
    Compendium_FavoriteMammalOtherText: { type: GraphQLString,  resolve: (obj) => obj.Compendium_FavoriteMammalOtherText, },
    Compendium_LastText:                { type: GraphQLString,  resolve: (obj) => obj.Compendium_LastText, },
    Compendium_LikedSunset_Ocean:       { type: GraphQLBoolean, resolve: (obj) => obj.Compendium_LikedSunset_Ocean, },
    Compendium_LikedSunset_Lake:        { type: GraphQLBoolean, resolve: (obj) => obj.Compendium_LikedSunset_Lake, },
    Compendium_LikedSunset_Mountains:   { type: GraphQLBoolean, resolve: (obj) => obj.Compendium_LikedSunset_Mountains, },
    Compendium_LikedSunset_Plains:      { type: GraphQLBoolean, resolve: (obj) => obj.Compendium_LikedSunset_Plains, },
    Compendium_LikedSunset_Purple:      { type: GraphQLBoolean, resolve: (obj) => obj.Compendium_LikedSunset_Purple, },
    Compendium_LikedSunset_Green:       { type: GraphQLBoolean, resolve: (obj) => obj.Compendium_LikedSunset_Green, },
    Compendium_LikedSunset_Other:       { type: GraphQLBoolean, resolve: (obj) => obj.Compendium_LikedSunset_Other, },
    Compendium_LikedSunset_OtherText:   { type: GraphQLString,  resolve: (obj) => obj.Compendium_LikedSunset_OtherText, },
  },
  interfaces: [nodeInterface]
} );

var {
  connectionType: CompendiumsConnection,
  edgeType: GraphQLCompendiumEdge,
} = connectionDefinitions( {
  name: 'Compendium',
  nodeType: GraphQLCompendium,
} );

// <-<-<- Compendium object type, connection and edge

// ->->-> ToDo object type, connection and edge

var GQLOT_ToDo = new GraphQLObjectType( {
  name: 'ToDo',
  fields: {
    id: globalIdField('ToDo'),
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
} );

var {
  connectionType: ToDosConnection,
  edgeType: GQLOT_ToDoEdge,
} = connectionDefinitions( {
  name: 'ToDo',
  nodeType: GQLOT_ToDo,
} );

// <-<-<- ToDo object type, connection and edge

var GQLOT_User = new GraphQLObjectType( {
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

    // ->->-> ToDo access through user

    todos: {
      type: ToDosConnection,
      args: {
        status: {
          type: GraphQLString,
          defaultValue: 'any',
        },
        ...connectionArgs,
      },
      resolve: ( obj, { status, ...args }, { rootValue: {user_id} } ) => connectionFromArray( DS_ToDo_list_get( user_id, status ), args )
    },
    totalCount: {
      type: GraphQLInt,
      resolve: ( obj, { status, ...args }, { rootValue: {user_id} } ) => DS_ToDo_list_get( user_id ).length
    },
    completedCount: {
      type: GraphQLInt,
      resolve: ( obj, { status, ...args }, { rootValue: {user_id} } ) => DS_ToDo_list_get( user_id, 'completed' ).length
    },

    // <-<-<- ToDo access through user
  },
  interfaces: [nodeInterface]
} );

var GQLOT_Root = new GraphQLObjectType( {
  name: 'Root',
  fields: {
    viewer: {
      type: GQLOT_User,
      resolve: ( parent, args, { rootValue: {user_id} } ) => DS_User_get( user_id )
    },
    node: nodeField
  },
} );


// ->->-> Compendium mutation definitions

var GQLM_Compendium_update = mutationWithClientMutationId( {
  name: 'Compendium_update',
  inputFields: {
    id:                                 { type: new GraphQLNonNull( GraphQLID ) },
    Compendium_FirstTextInput:          { type: new GraphQLNonNull( GraphQLString ) },
    Compendium_RangedNumber:            { type: new GraphQLNonNull( GraphQLInt ) },
    Compendium_Excitement:              { type: new GraphQLNonNull( GraphQLInt ) },
    Compendium_FollowUpQuestion:        { type: new GraphQLNonNull( GraphQLString ) },
    Compendium_FavoriteMammal:          { type: new GraphQLNonNull( GraphQLInt ) },
    Compendium_FavoriteMammalOtherText: { type: new GraphQLNonNull( GraphQLString ) },
    Compendium_LastText:                { type: new GraphQLNonNull( GraphQLString ) },
    Compendium_LikedSunset_Ocean:       { type: new GraphQLNonNull( GraphQLBoolean ) },
    Compendium_LikedSunset_Lake:        { type: new GraphQLNonNull( GraphQLBoolean ) },
    Compendium_LikedSunset_Mountains:   { type: new GraphQLNonNull( GraphQLBoolean ) },
    Compendium_LikedSunset_Plains:      { type: new GraphQLNonNull( GraphQLBoolean ) },
    Compendium_LikedSunset_Purple:      { type: new GraphQLNonNull( GraphQLBoolean ) },
    Compendium_LikedSunset_Green:       { type: new GraphQLNonNull( GraphQLBoolean ) },
    Compendium_LikedSunset_Other:       { type: new GraphQLNonNull( GraphQLBoolean ) },
    Compendium_LikedSunset_OtherText:   { type: new GraphQLNonNull( GraphQLString ) },
  },
  outputFields: {
    Compendium: {
      type: GraphQLCompendium,
      resolve: ( {localCompendiumId} ) => DS_Compendium_get( localCompendiumId ),
    },
  },
  mutateAndGetPayload: ( {
    id,
    Compendium_FirstTextInput,
    Compendium_RangedNumber,
    Compendium_Excitement,
    Compendium_FollowUpQuestion,
    Compendium_FavoriteMammal,
    Compendium_FavoriteMammalOtherText,
    Compendium_LastText,
    Compendium_LikedSunset_Ocean,
    Compendium_LikedSunset_Lake,
    Compendium_LikedSunset_Mountains,
    Compendium_LikedSunset_Plains,
    Compendium_LikedSunset_Purple,
    Compendium_LikedSunset_Green,
    Compendium_LikedSunset_Other,
    Compendium_LikedSunset_OtherText,
  } ) => {
    var local_id = fromGlobalId( id ).id;
    DS_Compendium_update(
      local_id,
      Compendium_FirstTextInput,
      Compendium_RangedNumber,
      Compendium_Excitement,
      Compendium_FollowUpQuestion,
      Compendium_FavoriteMammal,
      Compendium_FavoriteMammalOtherText,
      Compendium_LastText,
      Compendium_LikedSunset_Ocean,
      Compendium_LikedSunset_Lake,
      Compendium_LikedSunset_Mountains,
      Compendium_LikedSunset_Plains,
      Compendium_LikedSunset_Purple,
      Compendium_LikedSunset_Green,
      Compendium_LikedSunset_Other,
      Compendium_LikedSunset_OtherText,
    );
    return {local_id};
  },
} );

// <-<-<- Compendium mutation definitions


// ->->-> ToDo mutation definitions

var GQLM_ToDo_add = mutationWithClientMutationId( {
  name: 'ToDo_add',
  inputFields: {
    text: { type: new GraphQLNonNull( GraphQLString ) }
  },
  outputFields: {
    todoEdge: {
      type: GQLOT_ToDoEdge,
      resolve: ( {localToDoId}, args, { rootValue: {user_id} } ) => {
        var todo = DS_ToDo_get(localToDoId);
        return {
          cursor: cursorForObjectInConnection( DS_ToDo_list_get( user_id ), todo ),
          node: todo,
        };
      }
    },
    viewer: {
      type: GQLOT_User,
      resolve: ( parent, args, { rootValue: {user_id} } ) => DS_User_get( user_id )
    },
  },
  mutateAndGetPayload: ( {text}, { rootValue: {user_id} } ) =>
  {
    var localToDoId = DS_ToDo_add( user_id, text, false );
    return {localToDoId};
  }
} );

var GQML_ToDo_updateStatus = mutationWithClientMutationId( {
  name: 'ToDo_updateStatus',
  inputFields: {
    complete: { type: new GraphQLNonNull( GraphQLBoolean ) },
    id: { type: new GraphQLNonNull( GraphQLID ) },
  },
  outputFields: {
    todo: {
      type: GQLOT_ToDo,
      resolve: ( {localToDoId} ) => DS_ToDo_get( localToDoId ),
    },
    viewer: {
      type: GQLOT_User,
      resolve: ( parent, args, { rootValue: {user_id} } ) => DS_User_get( user_id )
    },
  },
  mutateAndGetPayload: ( { id, complete } ) => {
    var localToDoId = fromGlobalId(id).id;
    DS_ToDo_updateStatus( localToDoId, complete );
    return {localToDoId};
  },
} );

var GQLM_ToDo_list_updateMarkAll = mutationWithClientMutationId( {
  name: 'ToDo_list_updateMarkAll',
  inputFields: {
    complete: { type: new GraphQLNonNull( GraphQLBoolean ) },
  },
  outputFields: {
    changedToDos: {
      type: new GraphQLList(GQLOT_ToDo),
      resolve: ( {changedToDoLocalIds} ) => changedToDoLocalIds.map( DS_ToDo_get ),
    },
    viewer: {
      type: GQLOT_User,
      resolve: ( parent, args, { rootValue: {user_id} } ) => DS_User_get( user_id )
    },
  },
  mutateAndGetPayload: ( {complete}, { rootValue: {user_id} } ) =>
  {
    var changedToDoLocalIds = DS_ToDo_list_updateMarkAll( user_id, complete );
    return {changedToDoLocalIds};
  }
} );

var GQLM_ToDo_list_deleteCompleted = mutationWithClientMutationId( {
  name: 'ToDo_list_deleteCompleted',
  outputFields: {
    deletedToDoIds: {
      type: new GraphQLList( GraphQLString ),
      resolve: ( {deletedToDoIds} ) => deletedToDoIds,
    },
    viewer: {
      type: GQLOT_User,
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

var GraphQLToDo_deleteMutation = mutationWithClientMutationId( {
  name: 'ToDo_delete',
  inputFields: {
    id: { type: new GraphQLNonNull( GraphQLID ) },
  },
  outputFields: {
    deletedToDoId: {
      type: GraphQLID,
      resolve: ( {id} ) => id,
    },
    viewer: {
      type: GQLOT_User,
      resolve: ( parent, args, { rootValue: {user_id} } ) => DS_User_get( user_id )
    },
  },
  mutateAndGetPayload: ( {id}, { rootValue: {user_id} } ) => {
    var localToDoId = fromGlobalId(id).id;
    DS_ToDo_delete( user_id, localToDoId );
    return {id};
  }
} );

var GQLM_ToDo_updateRename = mutationWithClientMutationId( {
  name: 'ToDo_updateRename',
  inputFields: {
    id: { type: new GraphQLNonNull( GraphQLID ) },
    text: { type: new GraphQLNonNull( GraphQLString ) },
  },
  outputFields: {
    todo: {
      type: GQLOT_ToDo,
      resolve: ( {localToDoId} ) => DS_ToDo_get(localToDoId),
    }
  },
  mutateAndGetPayload: ( {id, text} ) => {
    var localToDoId = fromGlobalId(id).id;
    DS_ToDo_updateRename( localToDoId, text );
    return {localToDoId};
  },
} );

// <-<-<- ToDo mutation definitions

var GQLOT_Mutation = new GraphQLObjectType( {
  name: 'Mutation',
  fields: {

    // ->->-> Compendium mutation declarations

    Compendium_update: GQLM_Compendium_update,

    // <-<-<- Compendium mutation declarations

    // ->->-> ToDo mutation declarations

    ToDo_add: GQLM_ToDo_add,
    ToDo_updateStatus: GQML_ToDo_updateStatus,
    ToDo_list_updateMarkAll: GQLM_ToDo_list_updateMarkAll,
    ToDo_list_deleteCompleted: GQLM_ToDo_list_deleteCompleted,
    ToDo_delete: GraphQLToDo_deleteMutation,
    ToDo_updateRename: GQLM_ToDo_updateRename,

    // <-<-<- ToDo mutation declarations
  },
} );

export var schema = new GraphQLSchema( {
  query: GQLOT_Root,
  mutation: GQLOT_Mutation
} );
