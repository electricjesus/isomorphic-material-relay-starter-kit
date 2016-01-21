import generateUUID from './generateUUID'
import { DA_User_GetUUIDByID } from './User';

import ToDo from '../model/ToDo'


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
  return new Promise( ( resolve, reject ) => setTimeout( ( ) =>
  {
    var a_ToDo = new ToDo( fields );

    a_ToDo.id = generateUUID( );

    ToDo_listById[ a_ToDo.id ] = a_ToDo;
    ToDo_id_by_User_id[ a_ToDo.ToDo_User_id ].push( a_ToDo.id );

    resolve( a_ToDo.id );
  }, 100 ) );
}

export function DA_ToDo_update( id, fields )
{
  return new Promise( ( resolve, reject ) => setTimeout( ( ) =>
  {
    var a_ToDo = ToDo_listById[ id ];

    if( 'ToDo_Complete' in fields ) a_ToDo.ToDo_Complete = fields.ToDo_Complete;
    if( 'ToDo_Text' in fields ) a_ToDo.ToDo_Text = fields.ToDo_Text;

    resolve( );
  }, 100 ) );
}

export function DA_ToDo_get( id )
{
  return new Promise( ( resolve, reject ) => setTimeout( ( ) =>
  {
    resolve( ToDo_listById[ id ] );
  }, 100 ) );
}

export function DA_ToDo_delete( User_id, id )
{
  return new Promise( ( resolve, reject ) => setTimeout( ( ) =>
  {
    var ix_ToDo = ToDo_id_by_User_id[ User_id ].indexOf( id );

    if( ix_ToDo !== -1 )
      ToDo_id_by_User_id[ User_id ].splice( ix_ToDo, 1 );

    delete ToDo_listById[ id ];

    resolve( );
  }, 100 ) );
}

export function DA_ToDo_list_get( User_id, status = 'any' )
{
  return new Promise( ( resolve, reject ) => setTimeout( ( ) =>
  {
    let arr_ToDo = ToDo_id_by_User_id[ User_id ].map( id => ToDo_listById[ id ] );

    if( status !== 'any' )
    {
      let statusCheck = ( status === 'completed' );
      arr_ToDo = arr_ToDo.filter( a_ToDo => a_ToDo.ToDo_Complete === statusCheck );
    }

    resolve( arr_ToDo );
  }, 100 ) );
}

export function DA_ToDo_list_updateMarkAll( User_id, ToDo_Complete )
{
  return new Promise( ( resolve, reject ) => setTimeout( ( ) =>
  {
    User_id = 0;
    var changedToDos = [];
    DA_ToDo_list_get( User_id ).forEach(a_ToDo =>
    {
      if( a_ToDo.ToDo_Complete !== ToDo_Complete )
      {
        a_ToDo.ToDo_Complete = ToDo_Complete;
        changedToDos.push( a_ToDo );
      }
    } );
    resolve( changedToDos.map( a_ToDo => a_ToDo.id ) );
  }, 100 ) );
}

export function DA_ToDo_list_deleteCompleted( User_id )
{
  return new Promise( ( resolve, reject ) => setTimeout( ( ) =>
  {
    var ToDo_listToRemove = DA_ToDo_list_get( User_id ).filter( a_ToDo => a_ToDo.ToDo_Complete );
    ToDo_listToRemove.forEach( a_ToDo => DA_ToDo_delete( User_id, a_ToDo.id ) );
    resolve( ToDo_listToRemove.map( a_ToDo => a_ToDo.id ) );
  }, 100 ) );
}
