/* @flow weak */

import { globalIdField } from "graphql-relay";
import { GraphQLID, GraphQLBoolean, GraphQLInt, GraphQLString, GraphQLObjectType } from "graphql";
import { fromGlobalId, connectionArgs, connectionFromArray } from "graphql-relay";

import NodeInterface from "../interface/NodeInterface";
import User from '../../data/model/User';
import { Uuid } from '../../data/da_cassandra/_client.js';

const Uuid_0 = Uuid.fromString( '00000000-0000-0000-0000-000000000000' );

export default new GraphQLObjectType( {
  name: 'Viewer',
  interfaces: [NodeInterface],
  isTypeOf: object => object instanceof User,
  fields: {
    id: globalIdField('Viewer'),

    // ->->-> User properties

    User_IsAnonymous:  { type: GraphQLBoolean, resolve: (obj) => obj.id.equals( Uuid_0 ) },
    User_DisplayName:  { type: GraphQLString,  resolve: (obj) => obj.User_DisplayName },
    User_ProfilePhoto: { type: GraphQLString,  resolve: (obj) => obj.User_ProfilePhoto },
    User_Email:        { type: GraphQLString,  resolve: (obj) => obj.User_Email },
    User_Locale:       { type: GraphQLString,  resolve: (obj) => obj.User_Locale },
    User_AuthToken:    { type: GraphQLString,  resolve: (obj) => obj.User_AuthToken },

    // <-<-<- User properties

  },
} );
