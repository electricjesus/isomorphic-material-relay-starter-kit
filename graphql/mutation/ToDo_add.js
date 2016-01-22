import { fromGlobalId, mutationWithClientMutationId, cursorForObjectInConnection } from "graphql-relay";
import { GraphQLString, GraphQLID, GraphQLNonNull } from "graphql";

import { DA_User_get } from '../../data/da/User';
import { DA_ToDo_add, DA_ToDo_get, DA_ToDo_list_get } from '../../data/da/ToDo';

import ToDosConnection from '../type/ToDosConnection';
import ViewerType from '../type/ViewerType';

import chalk from 'chalk';

function cursorForObjectInConnectionWithUuidComparison( arr, obj )
{
  // Make sure that the object and its instance can be compared with ===
  // assumed that the object has id field which is unique
  for( let ix = 0; ix < arr.length; ix++ )
  {
    if( arr[ ix ].id.equals( obj.id ) )
    {
      arr[ ix ] = obj;
      break;
    }
  }

  let cursor = cursorForObjectInConnection( arr, obj );
  if( cursor == null )
  {
    console.log( chalk.bold.red( "Could not create cursor for object in connection" ) );
    console.log( chalk.gray( "Object: " ) + chalk.red( JSON.stringify( obj ) ) );
    console.log( chalk.gray( "Array: " ) + chalk.red( JSON.stringify( arr ) ) );
    console.log( chalk.blue( "." ) );
  }

  return cursor;
}

export default mutationWithClientMutationId( {
  name: 'ToDo_add',
  inputFields: {
    ToDo_Text: { type: new GraphQLNonNull( GraphQLString ) }
  },
  outputFields: {
    ToDosEdge: {
      type: ToDosConnection.edgeType,
      resolve: ( {localToDoId}, args, { rootValue: {user_id} } ) =>
      {
        let a_ToDo;
        return DA_ToDo_get( localToDoId )
          .then( ( retrieved_ToDo ) => {
            console.log( "ToDo_add, retrieved_ToDo=" + JSON.stringify( retrieved_ToDo ) );
            a_ToDo = retrieved_ToDo;
          } )
          .then( ( ) => DA_ToDo_list_get( user_id ) )
          .then( ( arr_ToDo ) =>
{

            //a_ToDo = arr_ToDo[ 0 ];
let xxxyyy = cursorForObjectInConnectionWithUuidComparison( arr_ToDo, a_ToDo );
          return( {
            cursor: xxxyyy,
            node: a_ToDo,
          } )
}
)
        ;
      }
    },
    Viewer: {
      type: ViewerType,
      resolve: ( parent, args, { rootValue: {user_id} } ) => DA_User_get( user_id )
    },
  },
  mutateAndGetPayload: ( {ToDo_Text}, { rootValue: {user_id} } ) =>
    DA_ToDo_add( { ToDo_User_id: user_id, ToDo_Text: ToDo_Text, ToDo_Complete: false } )
    .then( ( localToDoId ) => ( {localToDoId} ) )
} );
