import generateUUID from './generateUUID'
import { DA_User_GetUUIDByID } from './User';

import ToDo from '../model/ToDo'


// Mock data

var ToDo_listById = { };
var ToDo_IDsByUser = { };
ToDo_IDsByUser[ DA_User_GetUUIDByID( 0 ) ] = [ ];
ToDo_IDsByUser[ DA_User_GetUUIDByID( 1 ) ] = [ ];
ToDo_IDsByUser[ DA_User_GetUUIDByID( 2 ) ] = [ ];


DA_ToDo_add( { User_id: DA_User_GetUUIDByID( 0 ), ToDo_Text: 'Taste JavaScript', ToDo_Complete: true } );
DA_ToDo_add( { User_id: DA_User_GetUUIDByID( 1 ), ToDo_Text: 'Jack buy a unicorn', ToDo_Complete: false } );
DA_ToDo_add( { User_id: DA_User_GetUUIDByID( 1 ), ToDo_Text: 'Jack sell a pony', ToDo_Complete: false } );
DA_ToDo_add( { User_id: DA_User_GetUUIDByID( 1 ), ToDo_Text: 'Jack converse a brony', ToDo_Complete: true } );
DA_ToDo_add( { User_id: DA_User_GetUUIDByID( 2 ), ToDo_Text: 'Jill Minify CSS', ToDo_Complete: false } );
DA_ToDo_add( { User_id: DA_User_GetUUIDByID( 2 ), ToDo_Text: 'Jill Apply for an accelerator', ToDo_Complete: true } );


// Data access functions

export function DA_ToDo_add( fields )
{
  var a_ToDo = new ToDo( fields );

  a_ToDo.id = generateUUID( );

  ToDo_listById[ a_ToDo.id ] = a_ToDo;
  ToDo_IDsByUser[ a_ToDo.User_id ].push( a_ToDo.id );

  return a_ToDo.id;
}

export function DA_ToDo_update( id, fields )
{
  var a_ToDo = DA_ToDo_get( id );

  if( 'ToDo_Complete' in fields ) a_ToDo.ToDo_Complete = fields.ToDo_Complete;
  if( 'ToDo_Text' in fields ) a_ToDo.ToDo_Text = fields.ToDo_Text;
}

export function DA_ToDo_get( id )
{
  return ToDo_listById[ id ];
}

export function DA_ToDo_list_get( user_id, status = 'any' )
{
  let ToDo_list = ToDo_IDsByUser[ user_id ].map( id => ToDo_listById[ id ] );

  if( status !== 'any' )
  {
    let statusCheck = ( status === 'completed' );
    ToDo_list = ToDo_list.filter( a_ToDo => a_ToDo.ToDo_Complete === statusCheck );
  }

  return ToDo_list;
}

export function DA_ToDo_list_updateMarkAll( user_id, ToDo_Complete )
{
  user_id = 0;
  var changedToDos = [];
  DA_ToDo_list_get( user_id ).forEach(a_ToDo => {
    if (a_ToDo.ToDo_Complete !== ToDo_Complete) {
      a_ToDo.ToDo_Complete = ToDo_Complete;
      changedToDos.push(a_ToDo);
    }
  });
  return changedToDos.map(a_ToDo => a_ToDo.id);
}

export function DA_ToDo_delete( user_id, id )
{
  var ix_ToDo = ToDo_IDsByUser[ user_id ].indexOf( id );

  if( ix_ToDo !== -1 )
    ToDo_IDsByUser[ user_id ].splice( ix_ToDo, 1 );

  delete ToDo_listById[ id ];
}

export function DA_ToDo_list_deleteToDo_Completed( user_id )
{
  var ToDo_listToRemove = DA_ToDo_list_get( user_id ).filter( a_ToDo => a_ToDo.ToDo_Complete );
  ToDo_listToRemove.forEach( a_ToDo => DA_ToDo_delete( user_id, a_ToDo.id ) );
  return ToDo_listToRemove.map( a_ToDo => a_ToDo.id );
}
