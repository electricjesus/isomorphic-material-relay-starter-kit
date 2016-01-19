import { globalIdField } from "graphql-relay";
import { GraphQLInt, GraphQLString, GraphQLObjectType } from "graphql";
import { connectionArgs, connectionFromArray } from "graphql-relay";

import NodeInterface from "../interface/NodeInterface";

import User from '../../data/model/User';
import { DA_Compendium_list } from '../../data/da/Compendium';
import { DA_ToDo_list_get } from '../../data/da/ToDo';

import CompendiumsConnection from "./CompendiumsConnection";
import ToDosConnection from "./ToDosConnection";

export default new GraphQLObjectType( {
  name: 'Viewer',
  interfaces: [NodeInterface],
  isTypeOf: object => object instanceof User,
  fields: {
    id: globalIdField('Viewer'),

    // ->->-> Compendium access through user

    compendiums: {
      type: CompendiumsConnection.connectionType,
      args: { ...connectionArgs },
      resolve: ( obj, { ...args }, { rootValue: {user_id} } ) => DA_Compendium_list( user_id ).then( ( list ) => connectionFromArray( list, args ) )
    },

    // <-<-<- Compendium access through user

    // ->->-> ToDo access through user

    ToDos: {
      type: ToDosConnection.connectionType,
      args: {
        status: {
          type: GraphQLString,
          defaultValue: 'any',
        },
        ...connectionArgs,
      },
      resolve: ( obj, { status, ...args }, { rootValue: {user_id} } ) => connectionFromArray( DA_ToDo_list_get( user_id, status ), args )
    },
    ToDo_TotalCount: {
      type: GraphQLInt,
      resolve: ( obj, { status, ...args }, { rootValue: {user_id} } ) => DA_ToDo_list_get( user_id ).length
    },
    ToDo_CompletedCount: {
      type: GraphQLInt,
      resolve: ( obj, { status, ...args }, { rootValue: {user_id} } ) => DA_ToDo_list_get( user_id, 'completed' ).length
    },

    // <-<-<- ToDo access through user
  },
} );
