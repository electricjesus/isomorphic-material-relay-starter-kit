import { globalIdField } from "graphql-relay";
import { GraphQLString, GraphQLObjectType } from "graphql";

import NodeInterface from "../interface/NodeInterface";

import Ensayo from '../../data/model/Ensayo';

export default new GraphQLObjectType( {
  name: 'Ensayo',
  interfaces: [NodeInterface],
  isTypeOf: object => object instanceof Ensayo,
  fields: {
    id: globalIdField('Ensayo'),
    Ensayo_Title: { type: GraphQLString, resolve: (obj) => obj.Ensayo_Title },
    Ensayo_Keywords: { type: GraphQLString, resolve: (obj) => obj.Ensayo_Keywords },
    Ensayo_Content: { type: GraphQLString, resolve: (obj) => obj.Ensayo_Content },
  },
} );
