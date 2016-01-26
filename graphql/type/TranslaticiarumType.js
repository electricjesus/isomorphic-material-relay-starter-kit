import { globalIdField } from "graphql-relay";
import { GraphQLInt, GraphQLObjectType } from "graphql";

import NodeInterface from "../interface/NodeInterface";

import Translaticiarum from '../../data/model/Translaticiarum';

export default new GraphQLObjectType( {
  name: 'Translaticiarum',
  interfaces: [NodeInterface],
  isTypeOf: object => object instanceof Translaticiarum,
  fields: {
    id: globalIdField('Translaticiarum'),
    Translaticiarum_Date: { type: GraphQLInt, resolve: (obj) => obj.Translaticiarum_Text },
    Translaticiarum_Time: { type: GraphQLInt, resolve: (obj) => obj.Translaticiarum_Time },
    Translaticiarum_Type: { type: GraphQLInt, resolve: (obj) => obj.Translaticiarum_Type },
  },
} );
