import generateUUID from './generateUUID'

import ToDo from '../model/ToDo'

// Helper function to make sure we get our proper FK ID values
// The are constant so that we can use our cookies between server restarts
export function DA_User_GetUUIDByID( id )
{
  if( id === 0 )
  return '00000000-0000-0000-0000-000000000000'; // Anonymous user uses UUID also
  if( id === 1 )
    return 'd362e1df-1fa8-466b-b311-af90b2a71e8e';
  if( id === 2 )
    return '33171548-39d3-45d8-ab5c-5eedefe01dfc';
}


// Mock data

var ToDo_listById = { };
var ToDo_IDsByUser = { };
ToDo_IDsByUser[ DA_User_GetUUIDByID( 0 ) ] = [ ];
ToDo_IDsByUser[ DA_User_GetUUIDByID( 1 ) ] = [ ];
ToDo_IDsByUser[ DA_User_GetUUIDByID( 2 ) ] = [ ];


DA_ToDo_add( { User_id: DA_User_GetUUIDByID( 0 ), text: 'Taste JavaScript', complete: true } );
DA_ToDo_add( { User_id: DA_User_GetUUIDByID( 1 ), text: 'Jack buy a unicorn', complete: false } );
DA_ToDo_add( { User_id: DA_User_GetUUIDByID( 1 ), text: 'Jack sell a pony', complete: false } );
DA_ToDo_add( { User_id: DA_User_GetUUIDByID( 1 ), text: 'Jack converse a brony', complete: true } );
DA_ToDo_add( { User_id: DA_User_GetUUIDByID( 2 ), text: 'Jill Minify CSS', complete: false } );
DA_ToDo_add( { User_id: DA_User_GetUUIDByID( 2 ), text: 'Jill Apply for an accelerator', complete: true } );


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

  if( 'complete' in fields ) a_ToDo.complete = fields.complete;
  if( 'text' in fields ) a_ToDo.text = fields.text;
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
    ToDo_list = ToDo_list.filter( a_ToDo => a_ToDo.complete === statusCheck );
  }

  return ToDo_list;
}

export function DA_ToDo_list_updateMarkAll( user_id, complete )
{
  user_id = 0;
  var changedToDos = [];
  DA_ToDo_list_get( user_id ).forEach(a_ToDo => {
    if (a_ToDo.complete !== complete) {
      a_ToDo.complete = complete;
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

export function DA_ToDo_list_deleteCompleted( user_id )
{
  var ToDo_listToRemove = DA_ToDo_list_get( user_id ).filter( a_ToDo => a_ToDo.complete );
  ToDo_listToRemove.forEach( a_ToDo => DA_ToDo_delete( user_id, a_ToDo.id ) );
  return ToDo_listToRemove.map( a_ToDo => a_ToDo.id );
}
