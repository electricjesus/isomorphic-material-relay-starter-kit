import { sql, runQueryNoResult, runQueryOneResult } from './_client.js';
import User from '../model/User'
import { Uuid } from '../../data/da_cassandra/_client.js';

const User_0 = new User( { id: Uuid.fromString( '00000000-0000-0000-0000-000000000000' ), username: '', password: '', User_DisplayName: 'Anonymous', "User_ProfilePhoto": '', User_Email: '', User_Locale: '' } );

export function DA_User_add( fields )
{
  return DA_User_getByUserName( fields.username )
  .then( ( a_User ) =>
  {
    if ( ! a_User )
    {
      var new_User = new User( fields );
      new_User.id = Uuid.random( );

      let cqlText = 'INSERT INTO "User" (id, "username", "password", "User_DisplayName", "User_ProfilePhoto", "User_Email", "User_Locale" ) VALUES (?, ?, ?, ?, ?, ?, ?);';
      let cqlParams = [
        new_User.id,
        new_User.username,
        new_User.password,
        new_User.User_DisplayName,
        new_User.User_ProfilePhoto,
        new_User.User_Email,
        new_User.User_Locale,
      ];
      return runQueryNoResult( cqlText, cqlParams )
      .then( ( ) => {
        return new_User;
      } )
    }
    else throw new Error( "User name already in use" );
  } )
  ;
}

export function DA_User_getByUserName( username )
{
  const query = sql.select( )
    .from( '"User"' )
    .where( 'username=?', username )
    .toParam( )
  ;

  return runQueryOneResult( User, query.text, query.values );
}

export function DA_User_get( User_id )
{
  // Anonymous user is not even recorded in the database
  if( User_id === '00000000-0000-0000-0000-000000000000' )
  {
    return new Promise( ( resolve, reject ) =>
      resolve( User_0 )
    );
  }
  else
  {
    const query = sql.select( )
      .from( '"User"' )
      .where( 'id=?', User_id )
      .toParam( )
    ;
    return runQueryOneResult( User, query.text, query.values );
  }
}
