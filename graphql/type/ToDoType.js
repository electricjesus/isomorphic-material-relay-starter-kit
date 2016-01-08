import { globalIdField } from "graphql-relay";
import { GraphQLBoolean, GraphQLString, GraphQLObjectType } from "graphql";

import NodeInterface from "../interface/NodeInterface";

import { ToDo } from '../../data/ToDo';

export default new GraphQLObjectType( {
  name: 'ToDo',
  interfaces: [NodeInterface],
  isTypeOf: object => object instanceof ToDo,
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
} );
