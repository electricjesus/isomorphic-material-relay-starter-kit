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
var ToDo_id_by_User_id = { };
ToDo_id_by_User_id[ DA_User_GetUUIDByID( 0 ) ] = [ ];
ToDo_id_by_User_id[ DA_User_GetUUIDByID( 1 ) ] = [ ];
ToDo_id_by_User_id[ DA_User_GetUUIDByID( 2 ) ] = [ ];


DA_ToDo_add( { ToDo_User_id: DA_User_GetUUIDByID( 0 ), ToDo_Text: 'Taste JavaScript', ToDo_Complete: true } );
DA_ToDo_add( { ToDo_User_id: DA_User_GetUUIDByID( 1 ), ToDo_Text: 'Jack buy a unicorn', ToDo_Complete: false } );
DA_ToDo_add( { ToDo_User_id: DA_User_GetUUIDByID( 1 ), ToDo_Text: 'Jack sell a pony', ToDo_Complete: false } );
DA_ToDo_add( { ToDo_User_id: DA_User_GetUUIDByID( 1 ), ToDo_Text: 'Jack converse a brony', ToDo_Complete: true } );
DA_ToDo_add( { ToDo_User_id: DA_User_GetUUIDByID( 2 ), ToDo_Text: 'Jill Minify CSS', ToDo_Complete: false } );
DA_ToDo_add( { ToDo_User_id: DA_User_GetUUIDByID( 2 ), ToDo_Text: 'Jill Apply for an accelerator', ToDo_Complete: true } );


// Data access functions

export function DA_ToDo_add( fields )
{
  var a_ToDo = new ToDo( fields );

  a_ToDo.id = generateUUID( );

  ToDo_listById[ a_ToDo.id ] = a_ToDo;
  ToDo_id_by_User_id[ a_ToDo.ToDo_User_id ].push( a_ToDo.id );

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

export function DA_ToDo_delete( User_id, id )
{
  var ix_ToDo = ToDo_id_by_User_id[ User_id ].indexOf( id );

  if( ix_ToDo !== -1 )
    ToDo_id_by_User_id[ User_id ].splice( ix_ToDo, 1 );

  delete ToDo_listById[ id ];
}

export function DA_ToDo_list_get( User_id, status = 'any' )
{
  let ToDo_list = ToDo_id_by_User_id[ User_id ].map( id => ToDo_listById[ id ] );

  if( status !== 'any' )
  {
    let statusCheck = ( status === 'completed' );
    ToDo_list = ToDo_list.filter( a_ToDo => a_ToDo.ToDo_Complete === statusCheck );
  }

  return ToDo_list;
}

export function DA_ToDo_list_updateMarkAll( User_id, ToDo_Complete )
{
  User_id = 0;
  var changedToDos = [];
  DA_ToDo_list_get( User_id ).forEach(a_ToDo => {
    if (a_ToDo.ToDo_Complete !== ToDo_Complete) {
      a_ToDo.ToDo_Complete = ToDo_Complete;
      changedToDos.push(a_ToDo);
    }
  });
  return changedToDos.map(a_ToDo => a_ToDo.id);
}

export function DA_ToDo_list_deleteCompleted( User_id )
{
  var ToDo_listToRemove = DA_ToDo_list_get( User_id ).filter( a_ToDo => a_ToDo.ToDo_Complete );
  ToDo_listToRemove.forEach( a_ToDo => DA_ToDo_delete( User_id, a_ToDo.id ) );
  return ToDo_listToRemove.map( a_ToDo => a_ToDo.id );
}
