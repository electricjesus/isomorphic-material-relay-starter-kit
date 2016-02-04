import { Uuid } from '../da_cassandra/_client.js';

import Ensayo from '../model/Ensayo'


// Mock data

var Ensayo_listById = { };
var Ensayo_id_by_User_id = { };


// Data access functions

export function DA_Ensayo_add( fields )
{
  return new Promise( ( resolve, reject ) => setTimeout( ( ) =>
  {
    var a_Ensayo = new Ensayo( fields );

    a_Ensayo.id = Uuid.random( );

    Ensayo_listById[ a_Ensayo.id ] = a_Ensayo;

    let a_Ensayo_id_by_User_id = Ensayo_id_by_User_id[ a_Ensayo.Ensayo_User_id ];
    if( a_Ensayo_id_by_User_id == null )
      a_Ensayo_id_by_User_id = Ensayo_id_by_User_id[ a_Ensayo.Ensayo_User_id ] = [ ];

    a_Ensayo_id_by_User_id.push( a_Ensayo.id );

    resolve( a_Ensayo.id );
  }, 100 ) );
}

export function DA_Ensayo_update( id, fields )
{
  return new Promise( ( resolve, reject ) => setTimeout( ( ) =>
  {
    var a_Ensayo = Ensayo_listById[ id.toString( ) ];

    if( 'Ensayo_Title' in fields ) a_Ensayo.Ensayo_Title = fields.Ensayo_Title;
    if( 'Ensayo_Keywords' in fields ) a_Ensayo.Ensayo_Keywords = fields.Ensayo_Keywords;
    if( 'Ensayo_Content' in fields ) a_Ensayo.Ensayo_Content = fields.Ensayo_Content;

    resolve( );
  }, 100 ) );
}

export function DA_Ensayo_get( id )
{
  return new Promise( ( resolve, reject ) => setTimeout( ( ) =>
  {
    resolve( Ensayo_listById[ id.toString( ) ] );
  }, 100 ) );
}

export function DA_Ensayo_delete( User_id, id )
{
  return new Promise( ( resolve, reject ) => setTimeout( ( ) =>
  {
    var ix_Ensayo = Ensayo_id_by_User_id[ User_id ].indexOf( id.toString( ) );

    if( ix_Ensayo !== -1 )
      Ensayo_id_by_User_id[ User_id ].splice( ix_Ensayo, 1 );

    delete Ensayo_listById[ id.toString( ) ];

    resolve( );
  }, 100 ) );
}

export function DA_Ensayo_list_get( User_id )
{
  return new Promise( ( resolve, reject ) => setTimeout( ( ) =>
  {
    let arr_Ensayo;
    let a_Ensayo_id_by_User_id = Ensayo_id_by_User_id[ User_id ];
    if( a_Ensayo_id_by_User_id == null )
      arr_Ensayo = [ ];
    else
      arr_Ensayo = a_Ensayo_id_by_User_id.map( id => Ensayo_listById[ id ] );

    resolve( arr_Ensayo );
  }, 100 ) );
}
